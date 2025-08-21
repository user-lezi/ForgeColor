"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$invertColor",
    aliases: ["$colorInvert", "$inverseColor"],
    description: "Inverts a color's RGB channels and returns an new inverted color.",
    brackets: true,
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    args: [forgescript_1.Arg.requiredString("code", "The color to invert.")],
    async execute(ctx, [code]) {
        try {
            const originalFormat = (0, helpers_1.detectColorFormat)(code);
            if (!originalFormat) {
                return this.customError(`Could not detect color format for "${code}".`);
            }
            const rgbConverted = convert_1.ColorConverter.convert(code, typings_1.ColorFormat.rgb);
            if (!rgbConverted) {
                return this.customError(`Failed to convert color to RGB.`);
            }
            const parsed = (0, helpers_1.parseColor)(rgbConverted, typings_1.ColorFormat.rgb);
            if (!parsed || parsed.format !== typings_1.ColorFormat.rgb) {
                return this.customError(`Failed to parse color as RGB.`);
            }
            let invertedRGB = `rgb(${255 - parsed.r}, ${255 - parsed.g}, ${255 - parsed.b})`;
            const finalColor = convert_1.ColorConverter.convert(invertedRGB, originalFormat);
            if (!finalColor) {
                return this.customError(`Failed to convert inverted color back to "${originalFormat}".`);
            }
            return this.success(finalColor);
        }
        catch (err) {
            return this.customError(`Error while inverting color: ${err.message}`);
        }
    },
});
