"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorConverter = void 0;
const typings_1 = require("../typings");
const detectColorType_1 = require("./detectColorType");
const formatters_1 = require("./formatters");
const parseColor_1 = require("./parseColor");
class ColorConverter {
    static convert(input, to) {
        const from = (0, detectColorType_1.detectColorFormat)(input);
        if (!from)
            return null;
        const parsed = (0, parseColor_1.parseColor)(input, from);
        if (!parsed)
            return null;
        const rgb = this.#xToRGB(from, parsed);
        if (!rgb)
            return null;
        return this.#RGBtoX(to, rgb, "a" in parsed ? parsed.a : 1);
    }
    static #xToRGB(from, parsed) {
        switch (parsed.format) {
            case typings_1.ColorFormat.rgb:
            case typings_1.ColorFormat.rgba:
                return { r: parsed.r, g: parsed.g, b: parsed.b };
            case typings_1.ColorFormat.hex:
                return this.hexToRgb(parsed.value);
            case typings_1.ColorFormat.hsl:
                return this.hslToRgb(parsed.h, parsed.s, parsed.l);
            case typings_1.ColorFormat.cmyk:
                return this.cmykToRgb(parsed.c, parsed.m, parsed.y, parsed.k);
            case typings_1.ColorFormat.int:
                return {
                    r: (parsed.value >> 16) & 0xff,
                    g: (parsed.value >> 8) & 0xff,
                    b: parsed.value & 0xff,
                };
            default:
                return null;
        }
    }
    static #RGBtoX(to, rgb, alpha = 1) {
        switch (to) {
            case typings_1.ColorFormat.rgb:
                return (0, formatters_1.rgbToString)(rgb);
            case typings_1.ColorFormat.rgba:
                return (0, formatters_1.rgbaToString)({ ...rgb, a: alpha });
            case typings_1.ColorFormat.hex:
                return this.rgbToHex(rgb);
            case typings_1.ColorFormat.hsl:
                return (0, formatters_1.hslToString)(this.rgbToHsl(rgb));
            case typings_1.ColorFormat.cmyk:
                return (0, formatters_1.cmykToString)(this.rgbToCmyk(rgb));
            case typings_1.ColorFormat.int:
                return ((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString();
            default:
                return null;
        }
    }
    static hexToRgb(hex) {
        const raw = hex.replace(/^#/, "");
        const value = raw.length === 3
            ? raw
                .split("")
                .map((c) => c + c)
                .join("")
            : raw;
        const num = parseInt(value, 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255,
        };
    }
    static rgbToHex({ r, g, b }) {
        return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
    }
    static hslToRgb(h, s, l) {
        const k = (n) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
        return { r: f(0), g: f(8), b: f(4) };
    }
    static rgbToHsl({ r, g, b }) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;
        if (max === min)
            return { h: 0, s: 0, l: l * 100 };
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        let h = 0;
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        return {
            h: h * 60,
            s: s * 100,
            l: l * 100,
        };
    }
    static cmykToRgb(c, m, y, k) {
        return {
            r: Math.round(255 * (1 - c) * (1 - k)),
            g: Math.round(255 * (1 - m) * (1 - k)),
            b: Math.round(255 * (1 - y) * (1 - k)),
        };
    }
    static rgbToCmyk({ r, g, b }) {
        const r_ = r / 255;
        const g_ = g / 255;
        const b_ = b / 255;
        const k = 1 - Math.max(r_, g_, b_);
        if (k === 1)
            return { c: 0, m: 0, y: 0, k: 100 };
        const c = (1 - r_ - k) / (1 - k);
        const m = (1 - g_ - k) / (1 - k);
        const y = (1 - b_ - k) / (1 - k);
        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100),
        };
    }
}
exports.ColorConverter = ColorConverter;
