import { NativeFunction, ArgType, Arg } from "@tryforge/forgescript";
import { searchColorName } from "../../helpers";
import { ForgeColor } from "../..";

export default new NativeFunction({
  name: "$searchColorName",
  version: "1.1.0",
  description:
    "Finds named colors that contain a substring (case-insensitive).",
  aliases: [],
  unwrap: true,
  brackets: true,
  output: ArgType.String,
  args: [
    Arg.requiredString("query", "The substring to search for."),
    Arg.optionalNumber("limit", "Maximum number of results to return."),
    Arg.optionalString("separator", "String used to join multiple results."),
  ],

  execute(ctx, [query, limit, separator]) {
    // Clamp n between 1 and total available colors
    const totalColors = ForgeColor.Colors.length;
    limit = Math.trunc(Math.max(1, Math.min(Number(limit) || 5, totalColors)));
    const results = searchColorName(query, limit ?? 5);

    if (!results.length) return this.success();
    return this.success(results.map((c) => c.name).join(separator ?? ", "));
  },
});
