"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToString = rgbToString;
exports.rgbaToString = rgbaToString;
exports.hslToString = hslToString;
exports.cmykToString = cmykToString;
exports.hexToString = hexToString;
const clamp = (value, min = 0, max = 255) => Math.max(min, Math.min(max, value));
const clamp01 = (value) => Math.max(0, Math.min(1, value));
function rgbToString({ r, g, b, }) {
    return `rgb(${clamp(Math.round(r))}, ${clamp(Math.round(g))}, ${clamp(Math.round(b))})`;
}
function rgbaToString({ r, g, b, a = 1, }) {
    return `rgba(${clamp(Math.round(r))}, ${clamp(Math.round(g))}, ${clamp(Math.round(b))}, ${clamp01(a)})`;
}
function hslToString({ h, s, l, }) {
    const roundPct = (v) => `${Math.round(clamp01(v) * 100)}%`;
    return `hsl(${Math.round(clamp(h, 0, 360))}, ${roundPct(s)}, ${roundPct(l)})`;
}
function cmykToString({ c, m, y, k, }) {
    const roundPct = (v) => `${Math.round(clamp01(v) * 100)}%`;
    return `cmyk(${roundPct(c)}, ${roundPct(m)}, ${roundPct(y)}, ${roundPct(k)})`;
}
function hexToString(hex) {
    const cleaned = hex.trim().replace(/^#/, "");
    return `#${cleaned.toLowerCase()}`;
}
