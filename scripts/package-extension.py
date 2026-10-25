#!/usr/bin/env python3
"""Create store upload archives, with optional Chrome CRX packaging."""

import argparse
import copy
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parent.parent
RUNTIME_DIRS = ("_locales", "css", "html", "icon", "js")
RUNTIME_SUFFIXES = {".json", ".css", ".html", ".png", ".svg", ".js"}


def runtime_files():
    files = [ROOT / "LICENSE"]
    for directory in RUNTIME_DIRS:
        for path in sorted((ROOT / directory).rglob("*")):
            if path.is_symlink():
                raise ValueError(f"Refusing to package symlink: {path}")
            if path.is_file() and path.suffix in RUNTIME_SUFFIXES:
                files.append(path)
    return files


def target_manifest(source, target, firefox_id):
    manifest = copy.deepcopy(source)
    if target == "chrome":
        manifest.pop("browser_specific_settings", None)
    else:
        background = manifest["background"]
        background["scripts"] = [background.pop("service_worker")]
        gecko = manifest["browser_specific_settings"]["gecko"]
        if firefox_id:
            gecko["id"] = firefox_id
        # Firefox's built-in data consent declaration requires Firefox 140+.
        if "data_collection_permissions" in gecko:
            if int(gecko.get("strict_min_version", "0").split(".")[0]) < 140:
                gecko["strict_min_version"] = "140.0"
    return manifest


def write_archive(path, manifest, files):
    # Fixed timestamps and sorted entries keep archives reproducible.
    entries = {file.relative_to(ROOT).as_posix(): file.read_bytes() for file in files}
    entries["manifest.json"] = (json.dumps(manifest, indent=2) + "\n").encode()
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(entries.items()):
            info = zipfile.ZipInfo(name, date_time=(2020, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            archive.writestr(info, data)
    print(f"Created {path}")


def pack_crx(archive, output, chrome, key):
    with tempfile.TemporaryDirectory(prefix="canvas-enhanced-pack-") as temporary:
        staging = Path(temporary) / "extension"
        with zipfile.ZipFile(archive) as package:
            package.extractall(staging)
        result = subprocess.run(
            [chrome, "--headless=new", "--no-first-run", "--no-default-browser-check",
             f"--user-data-dir={Path(temporary) / 'profile'}",
             f"--pack-extension={staging}", f"--pack-extension-key={key}"],
            capture_output=True, text=True, timeout=60,
        )
        packed = staging.with_suffix(".crx")
        if result.returncode or not packed.is_file():
            raise ValueError(f"Chrome packaging failed: {result.stderr or result.stdout}")
        if packed.read_bytes()[:4] != b"Cr24":
            raise ValueError("Chrome did not produce a valid CRX header")
        shutil.copyfile(packed, output)
    print(f"Created {output}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--target", choices=("all", "chrome", "firefox"), default="all")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "dist")
    parser.add_argument("--firefox-id", help="AMO extension ID (keep it stable for updates)")
    parser.add_argument("--crx", action="store_true", help="Also create a CRX for self-distribution")
    parser.add_argument("--key", type=Path, help="Existing RSA PEM private key for CRX signing")
    parser.add_argument("--chrome", help="Chrome/Chromium executable path for CRX packaging")
    args = parser.parse_args()
    if args.crx and args.target == "firefox":
        parser.error("--crx requires --target chrome or all")
    chrome = None
    if args.crx:
        if not args.key or not args.key.is_file():
            parser.error("--crx requires --key pointing to an existing RSA PEM private key")
        chrome = args.chrome or next((shutil.which(name) for name in
                                     ("google-chrome", "chromium", "chromium-browser")
                                     if shutil.which(name)), None)
        if not chrome:
            parser.error("Chrome/Chromium not found; supply --chrome /path/to/browser")
    source = json.loads((ROOT / "manifest.json").read_text())
    version = source["version"]
    if not re.fullmatch(r"\d+(?:\.\d+){0,3}", version):
        parser.error("manifest.json has an invalid extension version")
    files = runtime_files()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    targets = ("chrome", "firefox") if args.target == "all" else (args.target,)
    for target in targets:
        manifest = target_manifest(source, target, args.firefox_id)
        suffix = "zip" if target == "chrome" else "xpi"
        output = args.output_dir / f"canvas-enhanced-{version}-{target}.{suffix}"
        write_archive(output, manifest, files)
        if target == "chrome" and args.crx:
            pack_crx(output, output.with_suffix(".crx"), chrome, args.key.resolve())
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, subprocess.SubprocessError) as error:
        print(f"Packaging failed: {error}", file=sys.stderr)
        sys.exit(1)
