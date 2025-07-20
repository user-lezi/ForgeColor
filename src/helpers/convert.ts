import { ColorFormat, ParsedColorByFormat } from "../typings";
import { detectColorFormat } from "./detectColorType";
import { rgbToString, rgbaToString, hslToString, cmykToString } from "./formatters";
import { parseColor } from "./parseColor";

/**
 * Utility class to convert between different color formats.
 */
export class ColorConverter {
  /**
   * Converts a color string to a different format.
   * @param input Original color string.
   * @param to Target format.
   * @returns Converted color string or null if invalid.
   */
  static convert(input: string, to: ColorFormat): string | null {
    const from = detectColorFormat(input);
    if (!from) return null;

    const parsed = parseColor(input, from);
    if (!parsed) return null;

    const rgb = this.#xToRGB(from, parsed);
    if (!rgb) return null;

    return this.#RGBtoX(to, rgb, "a" in parsed ? parsed.a : 1);
  }

  /**
   * Converts any format to RGB.
   * @internal
   */
  static #xToRGB<F extends ColorFormat>(
    from: F,
    parsed: ParsedColorByFormat<F>
  ): { r: number; g: number; b: number } | null {
    switch (parsed.format) {
      case ColorFormat.rgb:
      case ColorFormat.rgba:
        return { r: parsed.r, g: parsed.g, b: parsed.b };
      case ColorFormat.hex:
        return this.hexToRgb(parsed.value);
      case ColorFormat.hsl:
        return this.hslToRgb(parsed.h, parsed.s, parsed.l);
      case ColorFormat.cmyk:
        return this.cmykToRgb(parsed.c, parsed.m, parsed.y, parsed.k);
      case ColorFormat.int:
        return {
          r: (parsed.value >> 16) & 0xff,
          g: (parsed.value >> 8) & 0xff,
          b: parsed.value & 0xff,
        };
      default:
        return null;
    }
  }

  /**
   * Converts RGB to the target format.
   * @internal
   */
  static #RGBtoX(
    to: ColorFormat,
    rgb: { r: number; g: number; b: number },
    alpha = 1
  ): string | null {
    switch (to) {
      case ColorFormat.rgb:
        return rgbToString(rgb);
      case ColorFormat.rgba:
        return rgbaToString({ ...rgb, a: alpha });
      case ColorFormat.hex:
        return this.rgbToHex(rgb);
      case ColorFormat.hsl:
        return hslToString(this.rgbToHsl(rgb));
      case ColorFormat.cmyk:
        return cmykToString(this.rgbToCmyk(rgb));
      case ColorFormat.int:
        return ((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString();
      default:
        return null;
    }
  }

  // --- Converters ---

  /**
   * Converts a hex color string to RGB.
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const raw = hex.replace(/^#/, "");
    const value = raw.length === 3
      ? raw.split("").map(c => c + c).join("")
      : raw;
    const num = parseInt(value, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  /**
   * Converts RGB to hex string.
   */
  static rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
  }

  /**
   * Converts HSL values to RGB.
   */
  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return { r: f(0), g: f(8), b: f(4) };
  }

  /**
   * Converts RGB to HSL values.
   */
  static rgbToHsl({ r, g, b }: { r: number; g: number; b: number }): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) return { h: 0, s: 0, l: l * 100 };

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    return {
      h: h * 60,
      s: s * 100,
      l: l * 100
    };
  }

  /**
   * Converts CMYK values to RGB.
   */
  static cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number } {
    return {
      r: Math.round(255 * (1 - c) * (1 - k)),
      g: Math.round(255 * (1 - m) * (1 - k)),
      b: Math.round(255 * (1 - y) * (1 - k)),
    };
  }

  /**
   * Converts RGB to CMYK values.
   */
  static rgbToCmyk({ r, g, b }: { r: number; g: number; b: number }): { c: number; m: number; y: number; k: number } {
    const r_ = r / 255;
    const g_ = g / 255;
    const b_ = b / 255;

    const k = 1 - Math.max(r_, g_, b_);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

    const c = (1 - r_ - k) / (1 - k);
    const m = (1 - g_ - k) / (1 - k);
    const y = (1 - b_ - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  }
}
