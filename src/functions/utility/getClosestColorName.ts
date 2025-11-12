import { NativeFunction, ArgType, Arg } from "@tryforge/forgescript";
import { ColorConverter, parseColor } from "../../helpers";
import { ColorFormat } from "../../typings";
import { ForgeColor } from "../..";

export default new NativeFunction({
  name: "$findClosestColorName",
  version: "1.1.0",
  description:
    "Finds the closest named color(s) to a given color code, optionally returning multiple results.",
  aliases: ["$closestColorName", "$nearestColor"],
  unwrap: true,
  brackets: true,
  output: ArgType.String,
  args: [
    Arg.requiredString("color", "The color to compare."),
    Arg.optionalNumber(
      "results",
      "Number of closest matches to return (default: 1).",
    ),
    Arg.optionalString(
      "separator",
      "Separator to join multiple results (default: ', ').",
    ),
  ],

  execute(ctx, [color, n, separator]) {
    try {
      // Convert and validate color
      const rgbStr = ColorConverter.convert(color, ColorFormat.rgb);
      if (!rgbStr) {
        return this.customError(`Could not convert "${color}" to RGB.`);
      }

      const parsed = parseColor(rgbStr, ColorFormat.rgb);
      if (!parsed) {
        return this.customError(`Could not parse "${color}" as RGB.`);
      }

      // Clamp n between 1 and total available colors
      const totalColors = ForgeColor.Colors.length;
      const limit = Math.trunc(
        Math.max(1, Math.min(Number(n) || 1, totalColors)),
      );

      // Get closest colors
      const results = ForgeColor.FindClosestName(parsed, limit);

      if (!results.length) {
        return this.customError(`No close color matches found for "${color}".`);
      }

      const output = results.map((c) => c.name).join(separator ?? ", ");

      return this.success(output);
    } catch (err) {
      return this.customError(
        `An error occurred while finding closest color: ${(err as Error).message}`,
      );
    }
  },
});
