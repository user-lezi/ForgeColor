import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter, parseColor } from "../../helpers";
import { ColorFormat } from "../../typings";
import { isDarkColor } from "../../helpers/isDark";

export default new NativeFunction({
  name: "$isLightColor",
  aliases: ["$isLight", "$isColorLight"],
  description:
    "Checks if a color is light based on luminance (returns true/false).",
  brackets: true,
  unwrap: true,
  version: "1.0.1",
  output: ArgType.Boolean,

  args: [
    Arg.requiredString("color", "The color code to check."),
    Arg.optionalNumber(
      "threshold",
      "Override default luminance cutoff (0–1, default 0.5).",
    ),
  ],

  async execute(ctx, [color, threshold]) {
    try {
      // Convert input to RGB
      const rgbStr = ColorConverter.convert(color, ColorFormat.rgb);
      if (!rgbStr) {
        return this.customError(`Could not convert "${color}" to RGB.`);
      }

      const parsed = parseColor(rgbStr, ColorFormat.rgb);
      if (!parsed) {
        return this.customError(`Could not parse "${color}" as RGB.`);
      }

      const result = !isDarkColor(
        [parsed.r, parsed.g, parsed.b],
        threshold ?? 0.5,
      );
      return this.success(result);
    } catch (err) {
      return this.customError(
        `An error occurred while checking color brightness: ${(err as Error).message}`,
      );
    }
  },
});
