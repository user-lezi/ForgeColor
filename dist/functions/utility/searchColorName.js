"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$searchColorName",
    version: "1.1.0",
    description: "Finds named colors that contain a substring (case-insensitive).",
    aliases: [],
    unwrap: true,
    brackets: true,
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.requiredString("query", "The substring to search for."),
        forgescript_1.Arg.optionalNumber("limit", "Maximum number of results to return."),
        forgescript_1.Arg.optionalString("separator", "String used to join multiple results."),
    ],
    execute(ctx, [query, limit, separator]) {
        const totalColors = __1.ForgeColor.Colors.length;
        limit = Math.trunc(Math.max(1, Math.min(Number(limit) || 5, totalColors)));
        const results = (0, helpers_1.searchColorName)(query, limit ?? 5);
        if (!results.length)
            return this.success();
        return this.success(results.map((c) => c.name).join(separator ?? ", "));
    },
});
