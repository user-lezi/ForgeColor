import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$colorToRGB",
  aliases: ["$colorToRGBA"],
  description:
    "Converts a color code from any supported format (hex, rgb, hsl, etc.) to a rgb/rgba format.",
  brackets: true,
  unwrap: true,
  version: "1.0.1",
  output: ArgType.String,
  args: [
    Arg.requiredString("color", "The color string to convert."),
    Arg.optionalBoolean("alpha", "Whether to return as RGBA"),
  ],

  async execute(ctx, [color, alpha]) {
    try {
      const result = ColorConverter.convert(
        color,
        alpha == true ? ColorFormat.rgba : ColorFormat.rgb,
      );

      if (!result) {
        return this.customError(
          `Could not convert "${color}" to ${alpha ? "RGBA" : "RGB"} — make sure it is a valid color format.`,
        );
      }

      return this.success(result);
    } catch (err) {
      return this.customError(
        `An error occurred while converting color: ${(err as Error).message}`,
      );
    }
  },
});
