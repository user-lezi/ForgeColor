"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("../../typings");
const helpers_1 = require("../../helpers");
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
            let randomColor;
            switch (out) {
                case typings_1.ColorFormat.rgb:
                    randomColor = (0, helpers_1.rgbToString)({
                        r: Math.random() * 255,
                        g: Math.random() * 255,
                        b: Math.random() * 255,
                    });
                    break;
                case typings_1.ColorFormat.rgba:
                    randomColor = (0, helpers_1.rgbaToString)({
                        r: Math.random() * 255,
                        g: Math.random() * 255,
                        b: Math.random() * 255,
                        a: Math.random(),
                    });
                    break;
                case typings_1.ColorFormat.hex:
                    randomColor = (0, helpers_1.hexToString)(Math.floor(Math.random() * 0x1000000)
                        .toString(16)
                        .padStart(6, "0"));
                    break;
                case typings_1.ColorFormat.hsl:
                    randomColor = (0, helpers_1.hslToString)({
                        h: Math.random() * 360,
                        s: Math.random(),
                        l: Math.random(),
                    });
                    break;
                case typings_1.ColorFormat.int:
                    randomColor = Math.floor(Math.random() * 0x1000000).toString();
                    break;
                case typings_1.ColorFormat.cmyk:
                    randomColor = (0, helpers_1.cmykToString)({
                        c: Math.random(),
                        m: Math.random(),
                        y: Math.random(),
                        k: Math.random(),
                    });
                    break;
            }
            if (!randomColor) {
                return this.customError(`Failed to generate color for format "${out}".`);
            }
            return this.success(randomColor);
        }
        catch (err) {
            return this.customError(`An error occurred while generating a color: ${err.message}`);
        }
    },
});
