"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("../../typings");
const helpers_1 = require("../../helpers");
const colorDistance_1 = require("../../helpers/colorDistance");
exports.default = new forgescript_1.NativeFunction({
    name: "$colorDistance",
    aliases: ["$colorDifference", "$colorDiff", "$colorSimilarity"],
    description: "Calculates the distance between two colors using a specified formula. Defaults to cie76.",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.Number,
    args: [
        forgescript_1.Arg.requiredString("color1", "The first color."),
        forgescript_1.Arg.requiredString("color2", "The second color."),
        forgescript_1.Arg.optionalEnum(typings_1.ColorDistanceMode, "mode", "Distance mode: rgb, weighted, cie76, or luminance."),
    ],
    async execute(ctx, [clr1, clr2, mode]) {
        try {
            const rgb1 = (0, helpers_1.parseColor)(helpers_1.ColorConverter.convert(clr1, typings_1.ColorFormat.rgb) ?? "", typings_1.ColorFormat.rgb);
            if (!rgb1) {
                return this.customError(`Could not convert "${clr1}" to RGB — make sure it is a valid color.`);
            }
            const rgb2 = (0, helpers_1.parseColor)(helpers_1.ColorConverter.convert(clr2, typings_1.ColorFormat.rgb) ?? "", typings_1.ColorFormat.rgb);
            if (!rgb2) {
                return this.customError(`Could not convert "${clr2}" to RGB — make sure it is a valid color.`);
            }
            const distance = (0, colorDistance_1.colorDistance)(rgb1, rgb2, mode ?? typings_1.ColorDistanceMode.CIE76);
            return this.success(distance);
        }
        catch (err) {
            return this.customError(`An error occurred while calculating color distance: ${err.message}`);
        }
    },
});
