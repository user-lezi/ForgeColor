"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getColorFromName",
    version: "1.1.0",
    description: "Gets a color's code from named colors (case-insensitive).",
    aliases: ["$namedColor", "$colorName", "$colorFromName"],
    unwrap: true,
    brackets: true,
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("name", "The color name (see available colors in colors.json)."),
        forgescript_1.Arg.optionalEnum(__1.ColorFormat, "format", "The desired output format (hex, rgb, hsl, etc.)."),
    ],
    execute(ctx, [name, format]) {
        try {
            const value = __1.ForgeColor.GetColorFromName(name);
            if (value === null) {
                return this.success();
            }
            const output = __1.ColorConverter.convert("#" + value.toString(16).padStart(6, "0"), format ?? __1.ColorFormat.hex);
            if (!output)
                return this.customError(`Could not convert output color to "${format ?? __1.ColorFormat.hex}".`);
            return this.success(output);
        }
        catch (err) {
            return this.customError(`An error occurred while resolving color name: ${err.message}`);
        }
    },
});
