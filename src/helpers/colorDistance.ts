import { ColorDistanceMode, RGB } from "../typings";

// Helper: RGB → LAB (for CIE76)
function rgbToLab({ r, g, b }: RGB): { L: number; a: number; b: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

  x = f(x);
  y = f(y);
  z = f(z);

  return { L: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

export function colorDistance(
  c1: RGB,
  c2: RGB,
  mode: ColorDistanceMode,
): number {
  switch (mode) {
    case ColorDistanceMode.EuclideanRGB:
      return Math.hypot(c1.r - c2.r, c1.g - c2.g, c1.b - c2.b);

    case ColorDistanceMode.WeightedRGB:
      const redmean = (c1.r + c2.r) / 2;
      return Math.sqrt(
        (2 + redmean / 256) * Math.pow(c1.r - c2.r, 2) +
          4 * Math.pow(c1.g - c2.g, 2) +
          (2 + (255 - redmean) / 256) * Math.pow(c1.b - c2.b, 2),
      );

    case ColorDistanceMode.CIE76: {
      const l1 = rgbToLab(c1);
      const l2 = rgbToLab(c2);
      return Math.hypot(l1.L - l2.L, l1.a - l2.a, l1.b - l2.b);
    }

    case ColorDistanceMode.Luminance:
      const Y1 = 0.2126 * c1.r + 0.7152 * c1.g + 0.0722 * c1.b;
      const Y2 = 0.2126 * c2.r + 0.7152 * c2.g + 0.0722 * c2.b;
      return Math.abs(Y1 - Y2);

    default:
      throw new Error(`Unsupported distance mode: ${mode}`);
  }
}
