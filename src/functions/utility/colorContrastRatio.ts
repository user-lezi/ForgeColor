import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ColorConverter, contrastRatio, parseColor } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$colorContrastRatio",
  aliases: ["$contrastRatio"],
  description:
    "Calculates the WCAG contrast ratio between two colors (1.0–21.0). Higher = more contrast.",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.Number,
  args: [
    Arg.requiredString("color1", "First color."),
    Arg.requiredString("color2", "Second color."),
  ],

  async execute(ctx, [clr1, clr2]) {
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
      const ratio = contrastRatio(rgb1, rgb2);
      return this.success(ratio);
    } catch (err) {
      return this.customError(
        `An error occurred while calculating contrast ratio: ${(err as Error).message}`,
      );
    }
  },
});
