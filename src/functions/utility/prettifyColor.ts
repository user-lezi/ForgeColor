import { NativeFunction, Arg } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { detectColorFormat } from "../../helpers";

export default new NativeFunction({
  name: "$prettifyColor",
  aliases: ["$formatColor", "$normalizeColor"],
  description:
    "Returns a cleaner, standardized version of the given color string.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",
  args: [Arg.requiredString("code", "The color string to prettify.")],

  async execute(ctx, [code]) {
    try {
      const format = detectColorFormat(code);

      if (!format) {
        return this.customError(
          `Could not detect color format for "${code}". Make sure it is a valid hex, rgb, rgba, hsl, or cmyk code.`,
        );
      }

      const result = ColorConverter.convert(code, format);

      if (!result) {
        return this.customError(
          `Could not prettify the color. Conversion to "${format}" failed.`,
        );
      }

      return this.success(result);
    } catch (err) {
      return this.customError(
        `An error occurred while prettifying the color: ${(err as Error).message}`,
      );
    }
  },
});
