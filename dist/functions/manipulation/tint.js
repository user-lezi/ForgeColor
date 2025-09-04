"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
const manipulate_1 = require("../../helpers/manipulate");
exports.default = new forgescript_1.NativeFunction({
    name: "$tint",
    aliases: ["$tintColor"],
    description: "Lightens a color by blending it with white.",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("code", "The color to tint."),
        forgescript_1.Arg.requiredNumber("amount", "Amount to lighten (0–1)."),
    ],
    async execute(ctx, [code, amount]) {
        try {
            const originalFormat = (0, helpers_1.detectColorFormat)(code);
            if (!originalFormat) {
                return this.customError(`Could not detect color format for "${code}".`);
            }
            const rgbConverted = convert_1.ColorConverter.convert(code, typings_1.ColorFormat.rgb);
            if (!rgbConverted) {
                return this.customError(`Could not convert "${code}" to RGB.`);
            }
            const parsed = (0, helpers_1.parseColor)(rgbConverted, typings_1.ColorFormat.rgb);
            if (!parsed || parsed.format !== typings_1.ColorFormat.rgb) {
                return this.customError(`Could not parse "${code}" as RGB.`);
            }
            if (amount < 0 || amount > 1) {
                return this.customError(`Amount must be between 0 and 1.`);
            }
            const { r, g, b } = (0, manipulate_1.tint)(parsed, amount);
            const tintedRGB = `rgb(${r}, ${g}, ${b})`;
            const finalColor = convert_1.ColorConverter.convert(tintedRGB, originalFormat);
            if (!finalColor) {
                return this.customError(`Could not convert tinted color back to "${originalFormat}".`);
            }
            return this.success(finalColor);
        }
        catch (err) {
            return this.customError(`An error occurred while tinting color: ${err.message}`);
        }
    },
});
