import { NativeFunction, ArgType, Arg } from "@tryforge/forgescript";
import { isNamedColor } from "../../helpers";

export default new NativeFunction({
  name: "$isNamedColor",
  version: "1.1.0",
  description:
    "Checks whether a given color name exists in the named color list.",
  aliases: ["$isColorName"],
  unwrap: true,
  brackets: true,
  output: ArgType.Boolean,
  args: [Arg.requiredString("name", "The color name to check.")],

  execute(ctx, [name]) {
    const exists = isNamedColor(name);
    return this.success(exists);
  },
});
