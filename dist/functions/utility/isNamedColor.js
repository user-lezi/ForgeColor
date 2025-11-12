"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$isNamedColor",
    version: "1.1.0",
    description: "Checks whether a given color name exists in the named color list.",
    aliases: ["$isColorName"],
    unwrap: true,
    brackets: true,
    output: forgescript_1.ArgType.Boolean,
    args: [forgescript_1.Arg.requiredString("name", "The color name to check.")],
    execute(ctx, [name]) {
        const exists = (0, helpers_1.isNamedColor)(name);
        return this.success(exists);
    },
});
