"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$shade",
    aliases: ["$shadeColor"],
    description: "Darkens a color by blending it with black.",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("color", "The color to shade."),
        forgescript_1.Arg.requiredNumber("amount", "Amount to darken (0–1)."),
    ],
    async execute(ctx, [color, amount]) {
        try {
            const originalFormat = (0, helpers_1.detectColorFormat)(color);
            if (!originalFormat) {
                return this.customError(`Could not detect color format for "${color}".`);
            }
            const rgbConverted = convert_1.ColorConverter.convert(color, typings_1.ColorFormat.rgb);
            if (!rgbConverted) {
                return this.customError(`Could not convert "${color}" to RGB.`);
            }
            const parsed = (0, helpers_1.parseColor)(rgbConverted, typings_1.ColorFormat.rgb);
            if (!parsed || parsed.format !== typings_1.ColorFormat.rgb) {
                return this.customError(`Could not parse "${color}" as RGB.`);
            }
            if (amount < 0 || amount > 1) {
                return this.customError(`Amount must be between 0 and 1.`);
            }
            const { r, g, b } = (0, helpers_1.shade)(parsed, amount);
            const shadedRGB = `rgb(${r}, ${g}, ${b})`;
            const finalColor = convert_1.ColorConverter.convert(shadedRGB, originalFormat);
            if (!finalColor) {
                return this.customError(`Could not convert shaded color back to "${originalFormat}".`);
            }
            return this.success(finalColor);
        }
        catch (err) {
            return this.customError(`An error occurred while shading color: ${err.message}`);
        }
    },
});
