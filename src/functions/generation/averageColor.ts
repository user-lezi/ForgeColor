import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ColorConverter, parseColor, rgbToString } from "../../helpers";
import { ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$averageColor",
  aliases: ["$meanColor"],
  description:
    "Calculates the average (mean) color from two or more input colors and returns it in the specified format.",
  brackets: true,
  unwrap: true,
  version: "1.0.2",
  output: ArgType.String,
  args: [
    Arg.requiredEnum(
      ColorFormat,
      "format",
      "The desired output format (hex, rgb, hsl, etc.).",
    ),
    Arg.restString("colors", "Two or more colors to average.", true),
  ],

  async execute(ctx, [format, colors]) {
    if (!colors || colors.length < 2) {
      return this.customError(
        "You must provide at least two colors to average.",
      );
    }

    let avg = [0, 0, 0];

    for (const color of colors) {
      const rgb = ColorConverter.convert(color, ColorFormat.rgb);
      if (!rgb) return this.customError(`Could not convert "${color}" to RGB.`);

      const parsed = parseColor(rgb, ColorFormat.rgb);
      if (!parsed)
        return this.customError(`Failed to parse "${color}" as RGB.`);

      avg[0] += parsed.r;
      avg[1] += parsed.g;
      avg[2] += parsed.b;
    }

    avg = avg.map((v) => Math.round(v / colors.length));

    const rgbStr = rgbToString({ r: avg[0], g: avg[1], b: avg[2] });
    const output = ColorConverter.convert(rgbStr, format);

    if (!output)
      return this.customError(
        `Could not convert averaged color to "${format}".`,
      );

    return this.success(output);
  },
});
