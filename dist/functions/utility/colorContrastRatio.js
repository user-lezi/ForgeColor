"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$colorContrastRatio",
    aliases: ["$contrastRatio"],
    description: "Calculates the WCAG contrast ratio between two colors (1.0–21.0). Higher = more contrast.",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.Number,
    args: [
        forgescript_1.Arg.requiredString("color1", "First color."),
        forgescript_1.Arg.requiredString("color2", "Second color."),
    ],
    async execute(ctx, [clr1, clr2]) {
        try {
            const rgb1 = (0, helpers_1.parseColor)(helpers_1.ColorConverter.convert(clr1, typings_1.ColorFormat.rgb) ?? "", typings_1.ColorFormat.rgb);
            if (!rgb1) {
                return this.customError(`Could not convert "${clr1}" to RGB — make sure it is a valid color.`);
            }
            const rgb2 = (0, helpers_1.parseColor)(helpers_1.ColorConverter.convert(clr2, typings_1.ColorFormat.rgb) ?? "", typings_1.ColorFormat.rgb);
            if (!rgb2) {
                return this.customError(`Could not convert "${clr2}" to RGB — make sure it is a valid color.`);
            }
            const ratio = (0, helpers_1.contrastRatio)(rgb1, rgb2);
            return this.success(ratio);
        }
        catch (err) {
            return this.customError(`An error occurred while calculating contrast ratio: ${err.message}`);
        }
    },
});
