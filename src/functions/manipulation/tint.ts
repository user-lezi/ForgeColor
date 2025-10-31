import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { detectColorFormat, parseColor, tint } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$tint",
  aliases: ["$tintColor"],
  description: "Lightens a color by blending it with white.",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.String,

  args: [
    Arg.requiredString("color", "The color to tint."),
    Arg.requiredNumber("amount", "Amount to lighten (0–1)."),
  ],

  async execute(ctx, [color, amount]) {
    try {
      const originalFormat = detectColorFormat(color);
      if (!originalFormat) {
        return this.customError(
          `Could not detect color format for "${color}".`,
        );
      }

      const rgbConverted = ColorConverter.convert(color, ColorFormat.rgb);
      if (!rgbConverted) {
        return this.customError(`Could not convert "${color}" to RGB.`);
      }

      const parsed = parseColor(rgbConverted, ColorFormat.rgb);
      if (!parsed || parsed.format !== ColorFormat.rgb) {
        return this.customError(`Could not parse "${color}" as RGB.`);
      }

      if (amount < 0 || amount > 1) {
        return this.customError(`Amount must be between 0 and 1.`);
      }

      const { r, g, b } = tint(parsed, amount);
      const tintedRGB = `rgb(${r}, ${g}, ${b})`;

      const finalColor = ColorConverter.convert(tintedRGB, originalFormat);
      if (!finalColor) {
        return this.customError(
          `Could not convert tinted color back to "${originalFormat}".`,
        );
      }

      return this.success(finalColor);
    } catch (err) {
      return this.customError(
        `An error occurred while tinting color: ${(err as Error).message}`,
      );
    }
  },
});
