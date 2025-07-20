"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorParserPatterns = void 0;
exports.detectColorFormat = detectColorFormat;
const typings_1 = require("../typings");
const number = "-?\\d+(\\.\\d+)?";
const percent = `${number}%?`;
const comma = "\\s*,\\s*";
const rgbBody = `${percent}${comma}${percent}${comma}${percent}`;
const rgbaBody = `${percent}${comma}${percent}${comma}${percent}(?:${comma}(0|1|0?\\.\\d+))?`;
const hslBody = `${number}${comma}${percent}${comma}${percent}`;
const cmykBody = `${percent}${comma}${percent}${comma}${percent}${comma}${percent}`;
exports.ColorParserPatterns = {
    hex: /^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/i,
    rgb: new RegExp(`^rgb\\(${rgbBody}\\)$`),
    rgba: new RegExp(`^rgba\\(${rgbaBody}\\)$`),
    hsl: new RegExp(`^hsl\\(${hslBody}\\)$`),
    cmyk: new RegExp(`^cmyk\\(${cmykBody}\\)$`),
    int: /^(0x)?[0-9a-f]+$/i,
};
function detectColorFormat(input) {
    input = input.trim().toLowerCase();
    if (exports.ColorParserPatterns.hex.test(input))
        return typings_1.ColorFormat.hex;
    if (exports.ColorParserPatterns.rgb.test(input))
        return typings_1.ColorFormat.rgb;
    if (exports.ColorParserPatterns.rgba.test(input))
        return typings_1.ColorFormat.rgba;
    if (exports.ColorParserPatterns.hsl.test(input))
        return typings_1.ColorFormat.hsl;
    if (exports.ColorParserPatterns.int.test(input))
        return typings_1.ColorFormat.int;
    if (exports.ColorParserPatterns.cmyk.test(input))
        return typings_1.ColorFormat.cmyk;
    return null;
}
