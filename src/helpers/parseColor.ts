import { ColorFormat, ParsedColorByFormat } from "../typings";
import { detectColorFormat } from "./detectColorType";

// Utility to clamp numbers within a range
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}


/**
 * Parses a color string into a normalized structured object.
 * Supports various formats like `hex`, `rgb`, `rgba`, `hsl`, `cmyk`, and `int`.
 * 
 * @typeParam T - Expected color format
 * @param input - Raw color input string (e.g. `rgb(255, 0, 0)`, `#ff0000`)
 * @param expectedFormat - Optional format to validate against
 * @returns Parsed color object if valid; otherwise `null`
 */
export function parseColor<T extends ColorFormat>(
  input: string,
  expectedFormat?: T
): ParsedColorByFormat<T> | null {
  input = input.trim().toLowerCase();

  const detectedFormat = detectColorFormat(input);
  if (!detectedFormat || (expectedFormat && expectedFormat !== detectedFormat)) return null;

  switch (detectedFormat) {
    case ColorFormat.hex: {
      const hex = input.length === 4
        ? "#" + [...input.slice(1)].map(x => x + x).join("")
        : input;
      return { format: ColorFormat.hex, value: hex } as ParsedColorByFormat<T>;
    }
case ColorFormat.rgb: {
  const parts = splitColorParams(input)
  if (parts.length !== 3) return null;

  const parseRGB = (v: string) =>
    v.includes('%')
      ? Math.round((parseFloat(v) / 100) * 255)
      : Math.round(parseFloat(v));

  const [r, g, b] = [
    clamp(parseRGB(parts[0]), 0, 255),
    clamp(parseRGB(parts[1]), 0, 255),
    clamp(parseRGB(parts[2]), 0, 255),
  ];

  return { format: ColorFormat.rgb, r, g, b } as ParsedColorByFormat<T>;
}

case ColorFormat.rgba: {
  const parts = splitColorParams(input)
  if (parts.length < 3) return null;

  const parseRGB = (v: string) =>
    v.includes('%')
      ? Math.round((parseFloat(v) / 100) * 255)
      : Math.round(parseFloat(v));

  const r = clamp(parseRGB(parts[0]), 0, 255);
  const g = clamp(parseRGB(parts[1]), 0, 255);
  const b = clamp(parseRGB(parts[2]), 0, 255);
  const a = clamp(parseFloat(parts[3] ?? '1'), 0, 1);

  return { format: ColorFormat.rgba, r, g, b, a } as ParsedColorByFormat<T>;
}


    
case ColorFormat.hsl: {
  const parts = splitColorParams(input);
  if (parts.length !== 3) return null;

  const parseSL = (v: string) =>
    v.includes('%') ? parseFloat(v) / 100 : parseFloat(v);

  const h = clamp(parseFloat(parts[0]), 0, 360);
  const s = clamp(parseSL(parts[1]), 0, 1);
  const l = clamp(parseSL(parts[2]), 0, 1);

  return { format: ColorFormat.hsl, h, s, l } as ParsedColorByFormat<T>;
}

case ColorFormat.cmyk: {
  const parts = splitColorParams(input);
  if (parts.length !== 4) return null;

  const parse = (v: string) =>
    v.includes('%') ? parseFloat(v) / 100 : parseFloat(v);

  const [c, m, y, k] = parts.map(parse);

  return {
    format: ColorFormat.cmyk,
    c: clamp(c, 0, 1),
    m: clamp(m, 0, 1),
    y: clamp(y, 0, 1),
    k: clamp(k, 0, 1),
  } as ParsedColorByFormat<T>;
}

    case ColorFormat.int: {
      const int = parseInt(input.replace(/^0x/i, ''), 16);
      const clamped = clamp(int, 0, 0xFFFFFF);
      return { format: ColorFormat.int, value: clamped } as ParsedColorByFormat<T>;
    }

    default:
      return null;
  }
}
/**
 * Extracts color values from a function-style input like `rgb(...)`, `hsl(...)`, etc.
 * 
 * @param input - The full string input (e.g. `rgb(100%, 0%, 50%)`)
 * @returns Array of individual string values; empty array if invalid
 */
 function splitColorParams(input: string): string[] {
  const start = input.indexOf('(');
  const end = input.indexOf(')');
  if (start === -1 || end === -1 || end <= start) return [];
  
  return input
    .slice(start + 1, end)
    .split(',')
    .map(param => param.trim());
}
