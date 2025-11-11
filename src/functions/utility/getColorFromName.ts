import { NativeFunction, ArgType, Arg } from "@tryforge/forgescript";
import { ColorConverter, ColorFormat, ForgeColor, NamedColor } from "../..";

export default new NativeFunction({
  name: "$getColorFromName",
  version: "1.1.0",
  description: "Gets a color's code from named colors (case-insensitive).",
  aliases: ["$namedColor", "$colorName", "$colorFromName"],
  unwrap: true,
  brackets: true,
  output: ArgType.String,
  args: [
    Arg.requiredString(
      "name",
      "The color name (see available colors in colors.json).",
    ),
    Arg.optionalEnum(
      ColorFormat,
      "format",
      "The desired output format (hex, rgb, hsl, etc.).",
    ),
  ],

  execute(ctx, [name, format]) {
    try {
      const value = ForgeColor.GetColorFromName(name as NamedColor);

      if (value === null) {
        return this.success();
      }

      const output = ColorConverter.convert(
        "#" + value.toString(16).padStart(6, "0"), // im cool asf
        format ?? ColorFormat.hex,
      );

      if (!output)
        return this.customError(
          `Could not convert output color to "${format ?? ColorFormat.hex}".`,
        );

      return this.success(output);
    } catch (err) {
      return this.customError(
        `An error occurred while resolving color name: ${(err as Error).message}`,
      );
    }
  },
});
