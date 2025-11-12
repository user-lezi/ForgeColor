"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$findClosestColorName",
    version: "1.1.0",
    description: "Finds the closest named color(s) to a given color code, optionally returning multiple results.",
    aliases: ["$closestColorName", "$nearestColor"],
    unwrap: true,
    brackets: true,
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("color", "The color to compare."),
        forgescript_1.Arg.optionalNumber("results", "Number of closest matches to return (default: 1)."),
        forgescript_1.Arg.optionalString("separator", "Separator to join multiple results (default: ', ')."),
    ],
    execute(ctx, [color, n, separator]) {
        try {
            const rgbStr = helpers_1.ColorConverter.convert(color, typings_1.ColorFormat.rgb);
            if (!rgbStr) {
                return this.customError(`Could not convert "${color}" to RGB.`);
            }
            const parsed = (0, helpers_1.parseColor)(rgbStr, typings_1.ColorFormat.rgb);
            if (!parsed) {
                return this.customError(`Could not parse "${color}" as RGB.`);
            }
            const totalColors = __1.ForgeColor.Colors.length;
            const limit = Math.trunc(Math.max(1, Math.min(Number(n) || 1, totalColors)));
            const results = __1.ForgeColor.FindClosestName(parsed, limit);
            if (!results.length) {
                return this.customError(`No close color matches found for "${color}".`);
            }
            const output = results.map((c) => c.name).join(separator ?? ", ");
            return this.success(output);
        }
        catch (err) {
            return this.customError(`An error occurred while finding closest color: ${err.message}`);
        }
    },
});
