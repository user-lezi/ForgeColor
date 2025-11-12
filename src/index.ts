import { ForgeExtension } from "@tryforge/forgescript";
import { ColorDistanceMode, ColorFormat, NamedColor, RGB } from "./typings";
import { ColorConverter, colorDistance } from "./helpers";

/**
 * ForgeColor Options
 */
export interface IForgeColorOptions {
  customColorNames: Array<{ name: string; color: string | number }>;
}

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

  private options: IForgeColorOptions;

  /** Named Colors (includes built-ins + custom added) */
  public static Colors: Array<{
    name: NamedColor;
    value: number;
  }> = require("../colors.json");

  public constructor(options: Partial<IForgeColorOptions> = {}) {
    super();
    const opts: IForgeColorOptions = { customColorNames: [] };

    if (options.customColorNames?.length) {
      for (const color of options.customColorNames) {
        if (!color.name || typeof color.name !== "string")
          throw new Error(`Invalid color name: ${color.name}`);

        if (
          !color.color ||
          (typeof color.color !== "string" && typeof color.color !== "number")
        )
          throw new Error(`Invalid color value for "${color.name}"`);

        let value: number;

        // Handle number or string color
        if (typeof color.color === "number") {
          if (color.color < 0x000000 || color.color > 0xffffff)
            throw new Error(
              `Numeric color value for "${color.name}" must be between 0x000000 and 0xFFFFFF.`,
            );
          value = color.color;
        } else {
          const result = ColorConverter.convert(color.color, ColorFormat.hex);
          if (!result)
            throw new Error(
              `Could not convert string color "${color.color}" to hex.`,
            );
          value = parseInt(result.replace("#", ""), 16);
        }

        // Prevent duplicates
        if (ForgeColor.IsNamedColor(color.name))
          throw new Error(`Color name "${color.name}" already exists.`);

        ForgeColor.Colors.push({ name: color.name as NamedColor, value });
        opts.customColorNames.push(color);
      }
    }

    this.options = opts;
  }

  /** Loads all native functions for this extension. */
  public init(): void {
    this.load(`${__dirname}/functions`);
  }

  /** Finds a color’s integer value by its name. */
  public static GetColorFromName(name: NamedColor): number | null {
    const lower = name.toLowerCase();
    const found = this.Colors.find((c) => c.name.toLowerCase() === lower);
    return found?.value ?? null;
  }

  /** Finds the named color from an integer value. */
  public static GetNameFromColor(value: number): NamedColor | null {
    const found = this.Colors.find((c) => c.value === value);
    return found?.name ?? null;
  }

  /** Checks whether a given string is a valid named color. */
  public static IsNamedColor(name: string): name is NamedColor {
    return this.Colors.some((c) => c.name.toLowerCase() === name.toLowerCase());
  }

  /** Finds the closest named colors to a given RGB color or numeric value. */
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
