import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { parseColor, ColorConverter, rgbToString } from "../../helpers";
import { generateGradient } from "../../helpers/gradient";
import { ColorFormat, RGB } from "../../typings";
import { BlendMode } from "../../helpers/blend";

export default new NativeFunction({
  name: "$generateGradient",
  aliases: [],
  description:
    "Generates a gradient of color codes between two or more colors.",
  brackets: true,
  unwrap: true,
  version: "1.0.1",
  output: ArgType.Json,
  args: [
    Arg.requiredNumber("steps", "Total steps in the gradient"),
    Arg.requiredEnum(
      ColorFormat,
      "output format",
      "Format to return each color in: hex, rgb, rgba, hsl, or cmyk",
    ),
    Arg.optionalBoolean(
      "includeStops",
      "Include original stops in output (default: false)",
    ),
    Arg.optionalEnum(
      BlendMode,
      "mode",
      "How to interpolate between colors (default: average)",
    ),
    Arg.restString("colors", "At least two color codes to interpolate between"),
  ],

  async execute(ctx, [steps, format, includeStops, mode, colors]) {
    if (colors.length < 2) {
      return this.customError("At least two colors must be provided.");
    }

    const parsed: RGB[] = [];

    for (const raw of colors) {
      const converted = ColorConverter.convert(raw, ColorFormat.rgb);
      const color = parseColor(converted ?? "", ColorFormat.rgb);

      if (!color) {
        return this.customError(`Could not parse "${raw}" to RGB.`);
      }

      parsed.push({ r: color.r, g: color.g, b: color.b });
    }

    try {
      const gradient = generateGradient(
        parsed,
        steps,
        includeStops == true,
        mode || BlendMode.average,
      );

      const converted = gradient.map((rgb) => {
        const rgbString = rgbToString(rgb);
        const final = ColorConverter.convert(rgbString, format);
        return final ?? rgbString;
      });

      return this.successJSON(converted);
    } catch (err) {
      return this.customError(
        `An error occurred while generating the gradient: ${(err as Error).message}`,
      );
    }
  },
});
