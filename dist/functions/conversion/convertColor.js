"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$convertColor",
    aliases: ["$colorConvert", "$transformColor"],
    description: "Converts a color code from any supported format (hex, rgb, hsl, etc.) to a target format.",
    brackets: true,
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("code", "The color string to convert."),
        forgescript_1.Arg.requiredEnum(typings_1.ColorFormat, "to", "The format to convert the color to."),
    ],
    async execute(ctx, [code, to]) {
        try {
            const result = convert_1.ColorConverter.convert(code, to);
            if (!result) {
                return this.customError(`Could not convert "${code}" to ${to.toUpperCase()} — make sure it is a valid color format.`);
            }
            return this.success(result);
        }
        catch (err) {
            return this.customError(`An error occurred while converting color: ${err.message}`);
        }
    },
});
