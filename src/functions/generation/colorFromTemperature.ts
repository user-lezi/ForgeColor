import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter, rgbFromKelvin } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$colorFromTemperature",
  aliases: ["$colorFromTemp", "$kelvinToColor", "$colorTemperatureToColor"],
  description: "Generates a color from a given color temperature (Kelvin).",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.String,

  args: [
    Arg.requiredNumber(
      "kelvin",
      "Color temperature in Kelvin (e.g. 2000–40000).",
    ),
    Arg.optionalEnum(
      ColorFormat,
      "output format",
      "The desired output format: hex, rgb, rgba, hsl, int, or cmyk.",
    ),
  ],

  async execute(ctx, [kelvin, outputFormat]) {
    try {
      if (kelvin < 1000 || kelvin > 40000) {
        return this.customError(`Kelvin value must be between 1000 and 40000.`);
      }

      // Generate RGB from kelvin
      const { r, g, b } = rgbFromKelvin(kelvin);

      // Convert to requested format (default hex)
      const format = outputFormat ?? ColorFormat.hex;
      const rgbStr = `rgb(${r}, ${g}, ${b})`;

      const converted = ColorConverter.convert(rgbStr, format);
      if (!converted) {
        return this.customError(
          `Could not convert generated RGB to ${format}.`,
        );
      }

      return this.success(converted);
    } catch (err) {
      return this.customError(
        `An error occurred while generating color from temperature: ${(err as Error).message}`,
      );
    }
  },
});
