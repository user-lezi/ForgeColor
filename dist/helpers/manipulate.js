"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shade = shade;
exports.tint = tint;
const clamp = (v) => Math.max(0, Math.min(255, v));
function shade(color, percent) {
    const t = Math.max(0, Math.min(1, percent));
    return {
        r: clamp(color.r * (1 - t)),
        g: clamp(color.g * (1 - t)),
        b: clamp(color.b * (1 - t)),
    };
}
function tint(color, percent) {
    const t = Math.max(0, Math.min(1, percent));
    return {
        r: clamp(color.r + (255 - color.r) * t),
        g: clamp(color.g + (255 - color.g) * t),
        b: clamp(color.b + (255 - color.b) * t),
    };
}
