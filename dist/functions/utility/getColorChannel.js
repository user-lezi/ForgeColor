"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const convert_1 = require("../../helpers/convert");
const helpers_1 = require("../../helpers");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$getColorChannel",
    aliases: ["$colorChannel", "$extractColorChannel"],
    description: "Extracts a specific channel (e.g. red, hue, saturation) from a color code.",
    brackets: true,
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.Number,
    args: [
        forgescript_1.Arg.requiredString("code", "The color string to extract from."),
        forgescript_1.Arg.requiredEnum(typings_1.ColorChannels, "channel", "The channel to extract (e.g. red, hue, cyan)."),
    ],
    async execute(ctx, [code, channel]) {
        try {
            const format = (0, helpers_1.detectColorFormat)(code);
            if (!format) {
                return this.customError(` Could not detect color format for "${code}". Make sure it's a valid hex, rgb, rgba, hsl, or cmyk code.`);
            }
            let toFormat;
            switch (channel) {
                case typings_1.ColorChannels.red:
                case typings_1.ColorChannels.green:
                case typings_1.ColorChannels.blue:
                case typings_1.ColorChannels.alpha:
                    toFormat = typings_1.ColorFormat.rgba;
                    break;
                case typings_1.ColorChannels.hue:
                case typings_1.ColorChannels.saturation:
                case typings_1.ColorChannels.lightness:
                    toFormat = typings_1.ColorFormat.hsl;
                    break;
                case typings_1.ColorChannels.cyan:
                case typings_1.ColorChannels.magenta:
                case typings_1.ColorChannels.yellow:
                case typings_1.ColorChannels.key:
                    toFormat = typings_1.ColorFormat.cmyk;
                    break;
            }
            const converted = convert_1.ColorConverter.convert(code, toFormat);
            if (!converted) {
                return this.customError(`Could not convert color to ${toFormat}.`);
            }
            const parsed = (0, helpers_1.parseColor)(converted);
            if (!parsed || parsed.format !== toFormat) {
                return this.customError(`Could not parse color as "${toFormat}".`);
            }
            const round = (v) => Math.round(v * 1000) / 1000;
            let value;
            switch (parsed.format) {
                case typings_1.ColorFormat.rgba:
                    if (channel === typings_1.ColorChannels.red)
                        value = parsed.r;
                    else if (channel === typings_1.ColorChannels.green)
                        value = parsed.g;
                    else if (channel === typings_1.ColorChannels.blue)
                        value = parsed.b;
                    else if (channel === typings_1.ColorChannels.alpha)
                        value = round(parsed.a ?? 1);
                    break;
                case typings_1.ColorFormat.hsl:
                    if (channel === typings_1.ColorChannels.hue)
                        value = round(parsed.h);
                    else if (channel === typings_1.ColorChannels.saturation)
                        value = round(parsed.s);
                    else if (channel === typings_1.ColorChannels.lightness)
                        value = round(parsed.l);
                    break;
                case typings_1.ColorFormat.cmyk:
                    if (channel === typings_1.ColorChannels.cyan)
                        value = round(parsed.c);
                    else if (channel === typings_1.ColorChannels.magenta)
                        value = round(parsed.m);
                    else if (channel === typings_1.ColorChannels.yellow)
                        value = round(parsed.y);
                    else if (channel === typings_1.ColorChannels.key)
                        value = round(parsed.k);
                    break;
            }
            if (typeof value !== "number") {
                return this.customError(`Could not extract channel "${channel}" from color.`);
            }
            return this.success(value);
        }
        catch (err) {
            return this.customError(`An error occurred while extracting channel: ${err.message}`);
        }
    },
});
