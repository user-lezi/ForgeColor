import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { detectColorFormat, parseColor } from "../../helpers";
import { ColorFormat } from "../../typings";
import { tint } from "../../helpers/manipulate";

export default new NativeFunction({
  name: "$tint",
  aliases: ["$tintColor"],
  description: "Lightens a color by blending it with white.",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.String,

  args: [
    Arg.requiredString("code", "The color to tint."),
    Arg.requiredNumber("amount", "Amount to lighten (0–1)."),
  ],

  async execute(ctx, [code, amount]) {
    try {
      const originalFormat = detectColorFormat(code);
      if (!originalFormat) {
        return this.customError(`Could not detect color format for "${code}".`);
      }

      const rgbConverted = ColorConverter.convert(code, ColorFormat.rgb);
      if (!rgbConverted) {
        return this.customError(`Could not convert "${code}" to RGB.`);
      }

      const parsed = parseColor(rgbConverted, ColorFormat.rgb);
      if (!parsed || parsed.format !== ColorFormat.rgb) {
        return this.customError(`Could not parse "${code}" as RGB.`);
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
