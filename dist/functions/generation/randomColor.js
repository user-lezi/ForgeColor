"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$randomColor",
    description: "Generates a random color in the specified format (hex by default).",
    brackets: false,
    unwrap: true,
    version: "1.0.0",
    args: [
        forgescript_1.Arg.optionalEnum(typings_1.ColorFormat, "output format", "The desired output format: hex, rgb, rgba, hsl, int, or cmyk."),
    ],
    async execute(ctx, [out]) {
        try {
            out ??= typings_1.ColorFormat.hex;
            const randomHSL = `hsl(${Math.floor(Math.random() * 361)}, ${Math.floor(Math.random() * 101)}%, ${Math.floor(Math.random() * 101)}%)`;
            const result = convert_1.ColorConverter.convert(randomHSL, out);
            if (!result) {
                return this.customError(`Failed to convert color to format "${out}".`);
            }
            return this.success(result);
        }
        catch (err) {
            return this.customError(`An error occurred while generating a color: ${err.message}`);
        }
    },
});
