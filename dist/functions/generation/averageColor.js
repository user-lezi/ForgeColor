"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$averageColor",
    aliases: ["$meanColor"],
    description: "Calculates the average (mean) color from two or more input colors and returns it in the specified format.",
    brackets: true,
    unwrap: true,
    version: "1.0.2",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredEnum(typings_1.ColorFormat, "format", "The desired output format (hex, rgb, hsl, etc.)."),
        forgescript_1.Arg.restString("colors", "Two or more colors to average.", true),
    ],
    async execute(ctx, [format, colors]) {
        if (!colors || colors.length < 2) {
            return this.customError("You must provide at least two colors to average.");
        }
        let avg = [0, 0, 0];
        for (const color of colors) {
            const rgb = helpers_1.ColorConverter.convert(color, typings_1.ColorFormat.rgb);
            if (!rgb)
                return this.customError(`Could not convert "${color}" to RGB.`);
            const parsed = (0, helpers_1.parseColor)(rgb, typings_1.ColorFormat.rgb);
            if (!parsed)
                return this.customError(`Failed to parse "${color}" as RGB.`);
            avg[0] += parsed.r;
            avg[1] += parsed.g;
            avg[2] += parsed.b;
        }
        avg = avg.map((v) => Math.round(v / colors.length));
        const rgbStr = (0, helpers_1.rgbToString)({ r: avg[0], g: avg[1], b: avg[2] });
        const output = helpers_1.ColorConverter.convert(rgbStr, format);
        if (!output)
            return this.customError(`Could not convert averaged color to "${format}".`);
        return this.success(output);
    },
});
