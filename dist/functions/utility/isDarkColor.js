"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
const isDark_1 = require("../../helpers/isDark");
exports.default = new forgescript_1.NativeFunction({
    name: "$isDarkColor",
    aliases: ["$isDark", "$isColorDark"],
    description: "Checks if a color is dark based on luminance (returns true/false).",
    brackets: true,
    unwrap: true,
    version: "1.0.1",
    output: forgescript_1.ArgType.Boolean,
    args: [
        forgescript_1.Arg.requiredString("color", "The color code to check."),
        forgescript_1.Arg.optionalNumber("threshold", "Override default luminance cutoff (0–1, default 0.5)."),
    ],
    async execute(ctx, [color, threshold]) {
        try {
            const rgbStr = helpers_1.ColorConverter.convert(color, typings_1.ColorFormat.rgb);
            if (!rgbStr) {
                return this.customError(`Could not convert "${color}" to RGB.`);
            }
            const parsed = (0, helpers_1.parseColor)(rgbStr, typings_1.ColorFormat.rgb);
            if (!parsed) {
                return this.customError(`Could not parse "${color}" as RGB.`);
            }
            const result = (0, isDark_1.isDarkColor)([parsed.r, parsed.g, parsed.b], threshold ?? 0.5);
            return this.success(result);
        }
        catch (err) {
            return this.customError(`An error occurred while checking color brightness: ${err.message}`);
        }
    },
});
