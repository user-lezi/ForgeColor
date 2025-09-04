import { NativeFunction, ArgType, Arg } from "@tryforge/forgescript";
import { detectColorFormat } from "../../helpers";

export default new NativeFunction({
  name: "$isValidColor",
  version: "1.0.1",
  description: "Checks whether given color code is valid.",
  unwrap: true,
  brackets: true,
  output: ArgType.Boolean,
  args: [Arg.requiredString("color", "The color code to check validity of")],
  execute(ctx, [color]) {
    const format = detectColorFormat(color);
    return this.success(format !== null);
  },
});
