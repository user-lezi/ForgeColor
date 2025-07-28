import { NativeFunction, Arg } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { detectColorFormat, parseColor } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$invertColor",
  aliases: ["$colorInvert", "$inverseColor"],
  description:
    "Inverts a color's RGB channels and returns an new inverted color.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",

  args: [Arg.requiredString("code", "The color to invert.")],

  async execute(ctx, [code]) {
    try {
      const originalFormat = detectColorFormat(code);
      if (!originalFormat) {
        return this.customError(`Could not detect color format for "${code}".`);
      }

      const rgbConverted = ColorConverter.convert(code, ColorFormat.rgb);
      if (!rgbConverted) {
        return this.customError(`Failed to convert color to RGB.`);
      }

      const parsed = parseColor(rgbConverted, ColorFormat.rgb);
      if (!parsed || parsed.format !== ColorFormat.rgb) {
        return this.customError(`Failed to parse color as RGB.`);
      }

      // RGB channel-wise inversion
      let invertedRGB = `rgb(${255 - parsed.r}, ${255 - parsed.g}, ${255 - parsed.b})`;
      const finalColor = ColorConverter.convert(invertedRGB, originalFormat);
      if (!finalColor) {
        return this.customError(
          `Failed to convert inverted color back to "${originalFormat}".`,
        );
      }

      return this.success(finalColor);
    } catch (err) {
      return this.customError(
        `Error while inverting color: ${(err as Error).message}`,
      );
    }
  },
});
