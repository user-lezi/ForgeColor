import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorFormat } from "../../typings";
import {
  cmykToString,
  hexToString,
  hslToString,
  rgbaToString,
  rgbToString,
} from "../../helpers";

export default new NativeFunction({
  name: "$randomColor",
  description:
    "Generates a random color in the specified format (hex by default).",
  brackets: false,
  unwrap: true,
  version: "1.0.0",
  output: ArgType.String,
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
      let randomColor: string;
      switch (out) {
        case ColorFormat.rgb:
          randomColor = rgbToString({
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
          });
          break;
        case ColorFormat.rgba:
          randomColor = rgbaToString({
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
            a: Math.random(),
          });
          break;
        case ColorFormat.hex:
          randomColor = hexToString(
            Math.floor(Math.random() * 0x1000000)
              .toString(16)
              .padStart(6, "0"),
          );
          break;
        case ColorFormat.hsl:
          randomColor = hslToString({
            h: Math.random() * 360,
            s: Math.random(),
            l: Math.random(),
          });
          break;
        case ColorFormat.int:
          randomColor = Math.floor(Math.random() * 0x1000000).toString();
          break;
        case ColorFormat.cmyk:
          randomColor = cmykToString({
            c: Math.random(),
            m: Math.random(),
            y: Math.random(),
            k: Math.random(),
          });
          break;
      }
      if (!randomColor) {
        return this.customError(
          `Failed to generate color for format "${out}".`,
        );
      }

      return this.success(randomColor);
    } catch (err) {
      return this.customError(
        `An error occurred while generating a color: ${(err as Error).message}`,
      );
    }
  },
});
