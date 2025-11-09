import { ForgeExtension } from "@tryforge/forgescript";
import { ColorDistanceMode, NamedColor, RGB } from "./typings";
import { colorDistance } from "./helpers";

/**
 * ForgeColor — A ForgeScript extension for color utilities.
 */
export class ForgeColor extends ForgeExtension {
  /** Extension name. */
  public name = "ForgeColor";

  /** Extension description from package.json. */
  public description: string = require("../package.json").description;

  /** Extension version from package.json. */
  public version: string = require("../package.json").version;

  /** Named Colors (name + integer value) */
  public static Colors: Array<{
    name: NamedColor;
    value: number;
  }> = require("../colors.json");

  /** Loads all native functions for this extension. */
  public init(): void {
    this.load(`${__dirname}/functions`);
  }

  /**
   * Finds a color’s integer value by its name.
   * @param name - The named color (case-insensitive)
   * @returns The numeric value of the color, or null if not found.
   */
  public static GetColorFromName(name: NamedColor): number | null {
    const lower = name.toLowerCase();
    const found = this.Colors.find((c) => c.name.toLowerCase() === lower);
    return found?.value ?? null;
  }

  /**
   * Finds the named color from an integer value.
   * @param value - The numeric color value.
   * @returns The color’s name, or null if not found.
   */
  public static GetNameFromColor(value: number): NamedColor | null {
    const found = this.Colors.find((c) => c.value === value);
    return found?.name ?? null;
  }

  /**
   * Checks whether a given string is a valid named color.
   * @param name - The name to check.
   * @returns True if the color name exists.
   */
  public static IsNamedColor(name: string): name is NamedColor {
    return this.Colors.some((c) => c.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Finds the closest named colors to a given RGB color or numeric value.
   * @param value - Target color (integer or RGB)
   * @param n - Number of closest results to return (default = 1)
   * @returns Array of `{ name, value, distance }`, sorted by distance (closest first)
   */
  public static FindClosestName(
    value: number | RGB,
    n: number = 1,
  ): Array<{ name: NamedColor; value: number; distance: number }> {
    const targetRGB: RGB =
      typeof value === "number"
        ? { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
        : value;
    const results = this.Colors.map((c) => {
      const rgb: RGB = {
        r: (c.value >> 16) & 255,
        g: (c.value >> 8) & 255,
        b: c.value & 255,
      };
      return {
        ...c,
        distance: colorDistance(targetRGB, rgb, ColorDistanceMode.CIE76),
      };
    });
    return results.sort((a, b) => a.distance - b.distance).slice(0, n);
  }
}

export * from "./helpers";
export * from "./typings";
