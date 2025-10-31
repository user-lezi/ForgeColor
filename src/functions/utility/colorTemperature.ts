import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter, parseColor, rgbTemperature } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$colorTemperature",
  aliases: ["$temperatureFromColor", "$colorToTemperature", "$colorTemp"],
  description: "Estimates the color temperature (Kelvin) from a given color.",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.String,

  args: [
    Arg.requiredString("color", "The input color."),
    Arg.optionalBoolean(
      "returnKelvin",
      "If true, return the approximate Kelvin instead of warm/cool/neutral classification.",
    ),
  ],

  async execute(ctx, [color, returnKelvin]) {
    try {
      // Convert to RGB string
      const rgbStr = ColorConverter.convert(color, ColorFormat.rgb);
      if (!rgbStr) {
        return this.customError(`Could not convert "${color}" to RGB.`);
      }

      // Parse into RGB values
      const parsed = parseColor(rgbStr, ColorFormat.rgb);
      if (!parsed || parsed.format !== ColorFormat.rgb) {
        return this.customError(`Failed to parse "${color}" as RGB.`);
      }

      // Compute temperature
      const { category, kelvin } = rgbTemperature({
        r: parsed.r,
        g: parsed.g,
        b: parsed.b,
      });

      // Return based on flag
      if (returnKelvin) {
        if (!kelvin) {
          return this.customError(`Could not estimate Kelvin for "${color}".`);
        }
        return this.success(kelvin);
      } else {
        return this.success(category);
      }
    } catch (err) {
      return this.customError(
        `An error occurred while estimating color temperature: ${(err as Error).message}`,
      );
    }
  },
});
