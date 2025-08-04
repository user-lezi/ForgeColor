"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const blend_1 = require("../../helpers/blend");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$blendColors",
    aliases: ["$mixColors", "$blend"],
    description: "Blends two colors using a blend mode like average, multiply, or gamma.",
    brackets: true,
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("color 1", "The first color."),
        forgescript_1.Arg.requiredString("color 2", "The second color."),
        forgescript_1.Arg.requiredEnum(blend_1.BlendMode, "mode", "The blend mode to use (average, additive, screen, multiply, gamma)."),
        forgescript_1.Arg.optionalNumber("t", 'Blend factor between 0 and 1. Used only for "average" and "gamma" modes. Defaults to 0.5.'),
    ],
    async execute(ctx, [clr1, clr2, mode, t]) {
        try {
            const rgb1 = (0, helpers_1.parseColor)(helpers_1.ColorConverter.convert(clr1, typings_1.ColorFormat.rgb) ?? "", typings_1.ColorFormat.rgb);
            if (!rgb1) {
                return this.customError(`Could not convert "${clr1}" to RGB — make sure it is a valid color.`);
            }
            const rgb2 = (0, helpers_1.parseColor)(helpers_1.ColorConverter.convert(clr2, typings_1.ColorFormat.rgb) ?? "", typings_1.ColorFormat.rgb);
            if (!rgb2) {
                return this.customError(`Could not convert "${clr2}" to RGB — make sure it is a valid color.`);
            }
            if ((mode === blend_1.BlendMode.average || mode === blend_1.BlendMode.gamma) &&
                t != null &&
                (t < 0 || t > 1)) {
                return this.customError(`Blend factor \`t\` must be between 0 and 1.`);
            }
            const blended = (0, blend_1.blendRGB)([rgb1.r, rgb1.g, rgb1.b], [rgb2.r, rgb2.g, rgb2.b], mode, t ?? 0.5);
            return this.success((0, helpers_1.rgbToString)({ r: blended[0], g: blended[1], b: blended[2] }));
        }
        catch (err) {
            return this.customError(`An error occurred while blending colors: ${err.message}`);
        }
    },
});
