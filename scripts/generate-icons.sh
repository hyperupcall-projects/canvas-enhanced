#!/bin/sh
# Generates icon/icon-<size>.png files from assets/icon.png using ImageMagick.
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/icon.png"
OUT="$ROOT/icon"

if command -v magick >/dev/null 2>&1; then
  IM="magick"
elif command -v convert >/dev/null 2>&1; then
  IM="convert"
else
  echo "ImageMagick (magick) is not installed" >&2
  exit 1
fi

[ -f "$SRC" ] || { echo "Missing $SRC" >&2; exit 1; }
mkdir -p "$OUT"

for size in 16 19 32 38 48 128; do
  $IM "$SRC" -background none -resize "${size}x${size}" -strip "$OUT/icon-$size.png"
  echo "Created icon/icon-$size.png"
done
