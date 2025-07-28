"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColor = parseColor;
const typings_1 = require("../typings");
const detectColorType_1 = require("./detectColorType");
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function parseColor(input, expectedFormat) {
    input = input.trim().toLowerCase();
    const detectedFormat = (0, detectColorType_1.detectColorFormat)(input);
    if (!detectedFormat || (expectedFormat && expectedFormat !== detectedFormat))
        return null;
    switch (detectedFormat) {
        case typings_1.ColorFormat.hex: {
            const hex = input.length === 4
                ? "#" + [...input.slice(1)].map((x) => x + x).join("")
                : input;
            return { format: typings_1.ColorFormat.hex, value: hex };
        }
        case typings_1.ColorFormat.rgb: {
            const parts = splitColorParams(input);
            if (parts.length !== 3)
                return null;
            const parseRGB = (v) => v.includes("%")
                ? Math.round((parseFloat(v) / 100) * 255)
                : Math.round(parseFloat(v));
            const [r, g, b] = [
                clamp(parseRGB(parts[0]), 0, 255),
                clamp(parseRGB(parts[1]), 0, 255),
                clamp(parseRGB(parts[2]), 0, 255),
            ];
            return { format: typings_1.ColorFormat.rgb, r, g, b };
        }
        case typings_1.ColorFormat.rgba: {
            const parts = splitColorParams(input);
            if (parts.length < 3)
                return null;
            const parseRGB = (v) => v.includes("%")
                ? Math.round((parseFloat(v) / 100) * 255)
                : Math.round(parseFloat(v));
            const r = clamp(parseRGB(parts[0]), 0, 255);
            const g = clamp(parseRGB(parts[1]), 0, 255);
            const b = clamp(parseRGB(parts[2]), 0, 255);
            const a = clamp(parseFloat(parts[3] ?? "1"), 0, 1);
            return { format: typings_1.ColorFormat.rgba, r, g, b, a };
        }
        case typings_1.ColorFormat.hsl: {
            const parts = splitColorParams(input);
            if (parts.length !== 3)
                return null;
            const parseSL = (v) => v.includes("%") ? parseFloat(v) / 100 : parseFloat(v);
            const h = clamp(parseFloat(parts[0]), 0, 360);
            const s = clamp(parseSL(parts[1]), 0, 1);
            const l = clamp(parseSL(parts[2]), 0, 1);
            return { format: typings_1.ColorFormat.hsl, h, s, l };
        }
        case typings_1.ColorFormat.cmyk: {
            const parts = splitColorParams(input);
            if (parts.length !== 4)
                return null;
            const parse = (v) => v.includes("%") ? parseFloat(v) / 100 : parseFloat(v);
            const [c, m, y, k] = parts.map(parse);
            return {
                format: typings_1.ColorFormat.cmyk,
                c: clamp(c, 0, 1),
                m: clamp(m, 0, 1),
                y: clamp(y, 0, 1),
                k: clamp(k, 0, 1),
            };
        }
        case typings_1.ColorFormat.int: {
            const int = parseInt(input.replace(/^0x/i, ""), 16);
            const clamped = clamp(int, 0, 0xffffff);
            return {
                format: typings_1.ColorFormat.int,
                value: clamped,
            };
        }
        default:
            return null;
    }
}
function splitColorParams(input) {
    const start = input.indexOf("(");
    const end = input.indexOf(")");
    if (start === -1 || end === -1 || end <= start)
        return [];
    return input
        .slice(start + 1, end)
        .split(",")
        .map((param) => param.trim());
}
