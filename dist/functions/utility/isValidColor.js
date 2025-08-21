"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$isValidColor",
    version: "1.0.1",
    description: "Checks whether given color code is valid.",
    unwrap: true,
    brackets: true,
    output: forgescript_1.ArgType.Boolean,
    args: [forgescript_1.Arg.requiredString("code", "The color code to check validity of")],
    execute(ctx, [code]) {
        const format = (0, helpers_1.detectColorFormat)(code);
        return this.success(format !== null);
    },
});
