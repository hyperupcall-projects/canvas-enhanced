// Normalize legacy saved Canvas URLs before comparing exact hostnames.
function normalizeCanvasDomain(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    const input = value.trim();
    try {
        const url = new URL(input.includes("://") ? input : `https://${input}`);
        if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
        const host = url.hostname.toLowerCase();
        if (host.length > 253 || !host.split(".").every(label =>
            /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
        return host;
    } catch {
        return null;
    }
}
