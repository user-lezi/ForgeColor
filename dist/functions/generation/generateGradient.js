"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const gradient_1 = require("../../helpers/gradient");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$generateGradient",
    aliases: [],
    description: "Generates a gradient of color codes between two or more colors.",
    brackets: true,
    unwrap: true,
    version: "1.0.1",
    output: forgescript_1.ArgType.Json,
    args: [
        forgescript_1.Arg.requiredNumber("steps", "Total steps in the gradient"),
        forgescript_1.Arg.requiredEnum(typings_1.ColorFormat, "output format", "Format to return each color in: hex, rgb, rgba, hsl, or cmyk"),
        forgescript_1.Arg.optionalBoolean("includeStops", "Include original stops in output (default: false)"),
        forgescript_1.Arg.optionalEnum(typings_1.BlendMode, "mode", "How to interpolate between colors (default: average)"),
        forgescript_1.Arg.restString("colors", "At least two color codes to interpolate between"),
    ],
    async execute(ctx, [steps, format, includeStops, mode, colors]) {
        if (colors.length < 2) {
            return this.customError("At least two colors must be provided.");
        }
        const parsed = [];
        for (const raw of colors) {
            const converted = helpers_1.ColorConverter.convert(raw, typings_1.ColorFormat.rgb);
            const color = (0, helpers_1.parseColor)(converted ?? "", typings_1.ColorFormat.rgb);
            if (!color) {
                return this.customError(`Could not parse "${raw}" to RGB.`);
            }
            parsed.push({ r: color.r, g: color.g, b: color.b });
        }
        try {
            const gradient = (0, gradient_1.generateGradient)(parsed, steps, includeStops == true, mode || typings_1.BlendMode.average);
            const converted = gradient.map((rgb) => {
                const rgbString = (0, helpers_1.rgbToString)(rgb);
                const final = helpers_1.ColorConverter.convert(rgbString, format);
                return final ?? rgbString;
            });
            return this.successJSON(converted);
        }
        catch (err) {
            return this.customError(`An error occurred while generating the gradient: ${err.message}`);
        }
    },
});
