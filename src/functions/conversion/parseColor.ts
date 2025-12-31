import { NativeFunction, Arg, ArgType } from "@tryforge/forgescript";
import { parseColor } from "../../helpers/parseColor";

export default new NativeFunction({
  name: "$parseColor",
  aliases: ["$colorObject"],
  description: "Parses and normalizes a color string to a structured object.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",
  output: ArgType.Json,
  args: [Arg.requiredString("color", "The color string to parse")],
  async execute(ctx, [color]) {
    try {
      const result = parseColor(color);
      return this.successJSON(result);
    } catch (err) {
      return this.customError(
        `Failed to parse color: ${(err as Error).message}`,
      );
    }
  },
});
