import { ColorFormat } from "../typings";

/** Matches an integer or float, e.g. 10, -5, 0.5 */
const number = '-?\\d+(\\.\\d+)?';

/** Matches a number or percent, e.g. 50, 0.5, 100% */
const percent = `${number}%?`;

/** Matches a comma with optional surrounding spaces */
const comma = '\\s*,\\s*';

/** RGB component pattern: 3 percent values separated by commas */
const rgbBody = `${percent}${comma}${percent}${comma}${percent}`;

/** RGBA pattern: RGB + optional alpha (0–1) */
const rgbaBody = `${percent}${comma}${percent}${comma}${percent}(?:${comma}(0|1|0?\\.\\d+))?`;

/** HSL pattern: hue (0–360), saturation and lightness (percent or decimal) */
const hslBody = `${number}${comma}${percent}${comma}${percent}`;

/** CMYK pattern: 4 components in percent or decimal form */
const cmykBody = `${percent}${comma}${percent}${comma}${percent}${comma}${percent}`;

/**
 * Regex patterns for detecting different color formats
 */
export const ColorParserPatterns = {
  /** Matches hex strings like #fff or #ffcc00 */
  hex: /^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/i,

  /** Matches rgb(...) format with percent or numeric values */
  rgb: new RegExp(`^rgb\\(${rgbBody}\\)$`),

  /** Matches rgba(...) format with optional alpha value */
  rgba: new RegExp(`^rgba\\(${rgbaBody}\\)$`),

  /** Matches hsl(...) format with various forms of values */
  hsl: new RegExp(`^hsl\\(${hslBody}\\)$`),

  /** Matches cmyk(...) with percent or float components */
  cmyk: new RegExp(`^cmyk\\(${cmykBody}\\)$`),

  /** Matches integer form (decimal or hex) */
  int: /^(0x)?[0-9a-f]+$/i,
};

/**
 * Detects the color format from the input string.
 * @param input - Raw color input string
 * @returns The detected color format or null if unknown
 */
export function detectColorFormat(input: string): ColorFormat | null {
  input = input.trim().toLowerCase();

  if (ColorParserPatterns.hex.test(input)) return ColorFormat.hex;
  if (ColorParserPatterns.rgb.test(input)) return ColorFormat.rgb;
  if (ColorParserPatterns.rgba.test(input)) return ColorFormat.rgba;
  if (ColorParserPatterns.hsl.test(input)) return ColorFormat.hsl;
  if (ColorParserPatterns.int.test(input)) return ColorFormat.int;
  if (ColorParserPatterns.cmyk.test(input)) return ColorFormat.cmyk;

  return null;
}
