import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { ColorConverter } from "../../helpers/convert";
import { detectColorFormat, parseColor } from "../../helpers";
import { ColorChannels, ColorFormat } from "../../typings";

export default new NativeFunction({
  name: "$getColorChannel",
  aliases: ["$colorChannel", "$extractColorChannel"],
  description:
    "Extracts a specific channel (e.g. red, hue, saturation) from a color code.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",
  output: ArgType.Number,
  args: [
    Arg.requiredString("code", "The color string to extract from."),
    Arg.requiredEnum(
      ColorChannels,
      "channel",
      "The channel to extract (e.g. red, hue, cyan).",
    ),
  ],

  async execute(ctx, [code, channel]) {
    try {
      const format = detectColorFormat(code);

      if (!format) {
        return this.customError(
          ` Could not detect color format for "${code}". Make sure it's a valid hex, rgb, rgba, hsl, or cmyk code.`,
        );
      }

      let toFormat!: ColorFormat;

      switch (channel) {
        case ColorChannels.red:
        case ColorChannels.green:
        case ColorChannels.blue:
        case ColorChannels.alpha:
          toFormat = ColorFormat.rgba;
          break;

        case ColorChannels.hue:
        case ColorChannels.saturation:
        case ColorChannels.lightness:
          toFormat = ColorFormat.hsl;
          break;

        case ColorChannels.cyan:
        case ColorChannels.magenta:
        case ColorChannels.yellow:
        case ColorChannels.key:
          toFormat = ColorFormat.cmyk;
          break;
      }

      const converted = ColorConverter.convert(code, toFormat);

      if (!converted) {
        return this.customError(`Could not convert color to ${toFormat}.`);
      }
      const parsed = parseColor(converted);
      if (!parsed || parsed.format !== toFormat) {
        return this.customError(`Could not parse color as "${toFormat}".`);
      }

      const round = (v: number) => Math.round(v * 1000) / 1000;

      let value: number | undefined;

      switch (parsed.format) {
        case ColorFormat.rgba:
          if (channel === ColorChannels.red) value = parsed.r;
          else if (channel === ColorChannels.green) value = parsed.g;
          else if (channel === ColorChannels.blue) value = parsed.b;
          else if (channel === ColorChannels.alpha)
            value = round(parsed.a ?? 1);
          break;

        case ColorFormat.hsl:
          if (channel === ColorChannels.hue) value = round(parsed.h);
          else if (channel === ColorChannels.saturation)
            value = round(parsed.s);
          else if (channel === ColorChannels.lightness) value = round(parsed.l);
          break;

        case ColorFormat.cmyk:
          if (channel === ColorChannels.cyan) value = round(parsed.c);
          else if (channel === ColorChannels.magenta) value = round(parsed.m);
          else if (channel === ColorChannels.yellow) value = round(parsed.y);
          else if (channel === ColorChannels.key) value = round(parsed.k);
          break;
      }

      if (typeof value !== "number") {
        return this.customError(
          `Could not extract channel "${channel}" from color.`,
        );
      }

      return this.success(value);
    } catch (err) {
      return this.customError(
        `An error occurred while extracting channel: ${(err as Error).message}`,
      );
    }
  },
});
