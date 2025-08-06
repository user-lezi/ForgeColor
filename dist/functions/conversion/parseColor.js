"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const parseColor_1 = require("../../helpers/parseColor");
exports.default = new forgescript_1.NativeFunction({
    name: "$parseColor",
    aliases: ["$normalizeColor", "$colorObject"],
    description: "Parses and normalizes a color string to a structured object.",
    brackets: true,
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.Json,
    args: [forgescript_1.Arg.requiredString("code", "The color string to parse")],
    async execute(ctx, [code]) {
        try {
            const result = (0, parseColor_1.parseColor)(code);
            return this.successJSON(result);
        }
        catch (err) {
            return this.customError(`Failed to parse color: ${err.message}`);
        }
    },
});
