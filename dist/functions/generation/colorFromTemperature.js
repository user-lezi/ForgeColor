"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$colorFromTemperature",
    aliases: ["$colorFromTemp", "$kelvinToColor", "$colorTemperatureToColor"],
    description: "Generates a color from a given color temperature (Kelvin).",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredNumber("kelvin", "Color temperature in Kelvin (e.g. 2000–40000)."),
        forgescript_1.Arg.optionalEnum(typings_1.ColorFormat, "output format", "The desired output format: hex, rgb, rgba, hsl, int, or cmyk."),
    ],
    async execute(ctx, [kelvin, outputFormat]) {
        try {
            if (kelvin < 1000 || kelvin > 40000) {
                return this.customError(`Kelvin value must be between 1000 and 40000.`);
            }
            const { r, g, b } = (0, helpers_1.rgbFromKelvin)(kelvin);
            const format = outputFormat ?? typings_1.ColorFormat.hex;
            const rgbStr = `rgb(${r}, ${g}, ${b})`;
            const converted = helpers_1.ColorConverter.convert(rgbStr, format);
            if (!converted) {
                return this.customError(`Could not convert generated RGB to ${format}.`);
            }
            return this.success(converted);
        }
        catch (err) {
            return this.customError(`An error occurred while generating color from temperature: ${err.message}`);
        }
    },
});
