import { NativeFunction, Arg } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$randomColor",
  description:
    "Generates a random color in the specified format (hex by default).",
  brackets: false,
  unwrap: true,
  version: "1.0.0",
  args: [
    Arg.optionalEnum(
      ColorFormat,
      "output format",
      "The desired output format: hex, rgb, rgba, hsl, int, or cmyk.",
    ),
  ],

  async execute(ctx, [out]) {
    try {
      // Default to hex format if none is provided
      out ??= ColorFormat.hex;

      const randomHSL = `hsl(${Math.floor(Math.random() * 361)}, ${Math.floor(Math.random() * 101)}%, ${Math.floor(Math.random() * 101)}%)`;
      const result = ColorConverter.convert(randomHSL, out);

      if (!result) {
        return this.customError(`Failed to convert color to format "${out}".`);
      }

      return this.success(result);
    } catch (err) {
      return this.customError(
        `An error occurred while generating a color: ${(err as Error).message}`,
      );
    }
  },
});
