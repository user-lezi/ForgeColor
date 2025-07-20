import { NativeFunction, Arg } from "@tryforge/forgescript";
import { parseColor } from "../../helpers/parseColor";

export default new NativeFunction({
  name: "$parseColor",
  aliases: ["$normalizeColor", "$colorObject"],
  description: "Parses and normalizes a color string to a structured object.",
  brackets: true,
  unwrap: true,
  version: "1.0.0",
  args: [Arg.requiredString("code", "The color string to parse")],
  async execute(ctx, [code]) {
    try {
      const result = parseColor(code);
      return this.successJSON(result);
    } catch (err) {
      return this.customError(
        `Failed to parse color: ${(err as Error).message}`,
      );
    }
  },
});
