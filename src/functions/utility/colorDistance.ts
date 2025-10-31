import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorDistanceMode, ColorFormat } from "../../typings";
import { ColorConverter, colorDistance, parseColor } from "../../helpers";

export default new NativeFunction({
  name: "$colorDistance",
  aliases: ["$colorDifference", "$colorDiff", "$colorSimilarity"],
  description:
    "Calculates the distance between two colors using a specified formula. Defaults to cie76.",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.Number,
  args: [
    Arg.requiredString("color 1", "The first color."),
    Arg.requiredString("color 2", "The second color."),
    Arg.optionalEnum(
      ColorDistanceMode,
      "mode",
      "Distance mode: rgb, weighted, cie76, or luminance.",
    ),
  ],

  async execute(ctx, [clr1, clr2, mode]) {
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

      const distance = colorDistance(
        rgb1,
        rgb2,
        mode ?? ColorDistanceMode.CIE76,
      );

      return this.success(distance);
    } catch (err) {
      return this.customError(
        `An error occurred while calculating color distance: ${(err as Error).message}`,
      );
    }
  },
});
