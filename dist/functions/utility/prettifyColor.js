"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$prettifyColor",
    aliases: ["$formatColor", "$normalizeColor"],
    description: "Returns a cleaner, standardized version of the given color string.",
    brackets: true,
    unwrap: true,
    version: "1.0.0",
    args: [forgescript_1.Arg.requiredString("code", "The color string to prettify.")],
    async execute(ctx, [code]) {
        try {
            const format = (0, helpers_1.detectColorFormat)(code);
            if (!format) {
                return this.customError(`Could not detect color format for "${code}". Make sure it is a valid hex, rgb, rgba, hsl, or cmyk code.`);
            }
            const result = convert_1.ColorConverter.convert(code, format);
            if (!result) {
                return this.customError(`Could not prettify the color. Conversion to "${format}" failed.`);
            }
            return this.success(result);
        }
        catch (err) {
            return this.customError(`An error occurred while prettifying the color: ${err.message}`);
        }
    },
});
