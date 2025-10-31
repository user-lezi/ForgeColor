import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$convertColor",
  aliases: ["$colorConvert", "$transformColor"],
  description:
    "Converts a color code from any supported format (hex, rgb, hsl, etc.) to a target format.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",
  output: ArgType.String,
  args: [
    Arg.requiredString("color", "The color string to convert."),
    Arg.requiredEnum(ColorFormat, "to", "The format to convert the color to."),
  ],

  async execute(ctx, [color, to]) {
    try {
      const result = ColorConverter.convert(color, to);

      if (!result) {
        return this.customError(
          `Could not convert "${color}" to ${to.toUpperCase()} — make sure it is a valid color format.`,
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
