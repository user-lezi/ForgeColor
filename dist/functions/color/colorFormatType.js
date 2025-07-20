"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const detectColorType_1 = require("../../helpers/detectColorType");
exports.default = new forgescript_1.NativeFunction({
    name: "$colorFormatType",
    aliases: ["$getColorFormat", "$detectColorFormat"],
    description: "Returns the format of a given color code (hex, rgb, rgba, hsl, etc).",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredString("code", "The color code to get the format of")],
    async execute(ctx, [code]) {
        const format = (0, detectColorType_1.detectColorFormat)(code);
        return this.success(format ?? "unknown");
    },
});
