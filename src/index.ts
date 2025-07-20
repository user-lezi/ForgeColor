import { ForgeExtension } from "@tryforge/forgescript"

/**
 * ForgeColor - A ForgeScript extension for color utility.
 **/
export class ForgeColor extends ForgeExtension {
    /** Extension name. */
  public name: string = "ForgeColor";

  /** Extension description from package.json. */
  public description: string = require("../package.json").description;

  /** Extension version from package.json. */
  public version: string = require("../package.json").version;

    public init() {
      this.load(__dirname + '/functions');

    }
}

export * from "./helpers"
export * from "./typings"