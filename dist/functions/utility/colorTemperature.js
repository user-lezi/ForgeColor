"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$temperatureFromColor",
    aliases: ["$colorToTemperature", "$colorTemp"],
    description: "Estimates the color temperature (Kelvin) from a given color.",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("color", "The input color."),
        forgescript_1.Arg.optionalBoolean("returnKelvin", "If true, return the approximate Kelvin instead of warm/cool/neutral classification."),
    ],
    async execute(ctx, [color, returnKelvin]) {
        try {
            const rgbStr = helpers_1.ColorConverter.convert(color, typings_1.ColorFormat.rgb);
            if (!rgbStr) {
                return this.customError(`Could not convert "${color}" to RGB.`);
            }
            const parsed = (0, helpers_1.parseColor)(rgbStr, typings_1.ColorFormat.rgb);
            if (!parsed || parsed.format !== typings_1.ColorFormat.rgb) {
                return this.customError(`Failed to parse "${color}" as RGB.`);
            }
            const { category, kelvin } = (0, helpers_1.rgbTemperature)({
                r: parsed.r,
                g: parsed.g,
                b: parsed.b,
            });
            if (returnKelvin) {
                if (!kelvin) {
                    return this.customError(`Could not estimate Kelvin for "${color}".`);
                }
                return this.success(kelvin);
            }
            else {
                return this.success(category);
            }
        }
        catch (err) {
            return this.customError(`An error occurred while estimating color temperature: ${err.message}`);
        }
    },
});
