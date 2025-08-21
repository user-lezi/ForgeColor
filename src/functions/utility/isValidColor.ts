import { NativeFunction, ArgType, Arg } from "@tryforge/forgescript";
import { detectColorFormat } from "../../helpers";

export default new NativeFunction({
  name: "$isValidColor",
  version: "1.0.1",
  description: "Checks whether given color code is valid.",
  unwrap: true,
  brackets: true,
  output: ArgType.Boolean,
  args: [Arg.requiredString("code", "The color code to check validity of")],
  execute(ctx, [code]) {
    const format = detectColorFormat(code);
    return this.success(format !== null);
  },
});
