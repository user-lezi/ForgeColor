"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$colorToHSL",
    aliases: [],
    description: "Converts a color code from any supported format (hex, rgb, hsl, etc.) to a hsl format.",
    brackets: true,
    unwrap: true,
    version: "1.0.1",
    output: forgescript_1.ArgType.String,
    args: [forgescript_1.Arg.requiredString("code", "The color string to convert.")],
    async execute(ctx, [code]) {
        try {
            const result = convert_1.ColorConverter.convert(code, typings_1.ColorFormat.hsl);
            if (!result) {
                return this.customError(`Could not convert "${code}" to HSL — make sure it is a valid color format.`);
            }
            return this.success(result);
        }
        catch (err) {
            return this.customError(`An error occurred while converting color: ${err.message}`);
        }
    },
});
