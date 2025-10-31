"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$colorToRGB",
    aliases: ["$colorToRGBA"],
    description: "Converts a color code from any supported format (hex, rgb, hsl, etc.) to a rgb/rgba format.",
    brackets: true,
    unwrap: true,
    version: "1.0.1",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("color", "The color string to convert."),
        forgescript_1.Arg.optionalBoolean("alpha", "Whether to return as RGBA"),
    ],
    async execute(ctx, [color, alpha]) {
        try {
            const result = convert_1.ColorConverter.convert(color, alpha == true ? typings_1.ColorFormat.rgba : typings_1.ColorFormat.rgb);
            if (!result) {
                return this.customError(`Could not convert "${color}" to ${alpha ? "RGBA" : "RGB"} — make sure it is a valid color format.`);
            }
            return this.success(result);
        }
        catch (err) {
            return this.customError(`An error occurred while converting color: ${err.message}`);
        }
    },
});
