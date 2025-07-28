import { NativeFunction, Arg } from "@tryforge/forgescript";
import { BlendMode, blendRGB } from "../../helpers/blend";
import { ColorConverter, parseColor, rgbToString } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$blendColors",
  aliases: ["$mixColors", "$blend"],
  description:
    "Blends two colors using a blend mode like average, multiply, or gamma.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",

  args: [
    Arg.requiredString("color 1", "The first color."),
    Arg.requiredString("color 2", "The second color."),
    Arg.requiredEnum(
      BlendMode,
      "mode",
      "The blend mode to use (average, additive, screen, multiply, gamma).",
    ),
    Arg.optionalNumber(
      "t",
      'Blend factor between 0 and 1. Used only for "average" and "gamma" modes. Defaults to 0.5.',
    ),
  ],

  async execute(ctx, [clr1, clr2, mode, t]) {
    try {
      const rgb1 = parseColor(
        ColorConverter.convert(clr1, ColorFormat.rgb) ?? "",
        ColorFormat.rgb,
      );
      if (!rgb1) {
        return this.customError(
          `Could not convert "${clr1}" to RGB — make sure it is a valid color.`,
        );
      }

      const rgb2 = parseColor(
        ColorConverter.convert(clr2, ColorFormat.rgb) ?? "",
        ColorFormat.rgb,
      );
      if (!rgb2) {
        return this.customError(
          `Could not convert "${clr2}" to RGB — make sure it is a valid color.`,
        );
      }

      if (
        (mode === BlendMode.average || mode === BlendMode.gamma) &&
        t != null &&
        (t < 0 || t > 1)
      ) {
        return this.customError(`Blend factor \`t\` must be between 0 and 1.`);
      }

      const blended = blendRGB(
        [rgb1.r, rgb1.g, rgb1.b],
        [rgb2.r, rgb2.g, rgb2.b],
        mode,
        t ?? 0.5,
      );

      return this.success(
        rgbToString({ r: blended[0], g: blended[1], b: blended[2] }),
      );
    } catch (err) {
      return this.customError(
        `An error occurred while blending colors: ${(err as Error).message}`,
      );
    }
  },
});
