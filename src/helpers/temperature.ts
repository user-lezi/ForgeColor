// thanks ai.

import { RGB } from "../typings";

/**
 * Converts a Kelvin temperature (1000K–40000K) to an approximate RGB color.
 * Based on Tanner Helland’s algorithm.
 */
export function rgbFromKelvin(k: number): RGB {
  let temp = k / 100;

  let r, g, b;

  // Red
  if (temp <= 66) {
    r = 255;
  } else {
    r = temp - 60;
    r = 329.698727446 * Math.pow(r, -0.1332047592);
    r = Math.min(255, Math.max(0, r));
  }

  // Green
  if (temp <= 66) {
    g = 99.4708025861 * Math.log(temp) - 161.1195681661;
    g = Math.min(255, Math.max(0, g));
  } else {
    g = temp - 60;
    g = 288.1221695283 * Math.pow(g, -0.0755148492);
    g = Math.min(255, Math.max(0, g));
  }

  // Blue
  if (temp >= 66) {
    b = 255;
  } else if (temp <= 19) {
    b = 0;
  } else {
    b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
    b = Math.min(255, Math.max(0, b));
  }

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

/**
 * Attempts to estimate a color’s temperature category & Kelvin approximation.
 */
export function rgbTemperature({ r, g, b }: RGB): {
  category: "warm" | "neutral" | "cool";
  kelvin: number;
} {
  // Compute correlated color temperature (CCT) approximation
  // Using McCamy’s approximation from xy chromaticity
  const R = r / 255,
    G = g / 255,
    B = b / 255;

  const X = 0.4124 * R + 0.3576 * G + 0.1805 * B;
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const Z = 0.0193 * R + 0.1192 * G + 0.9505 * B;

  const x = X / (X + Y + Z);
  const y = Y / (X + Y + Z);

  // McCamy formula for CCT
  const n = (x - 0.332) / (0.1858 - y);
  const kelvin =
    449 * Math.pow(n, 3) + 3525 * Math.pow(n, 2) + 6823.3 * n + 5520.33;

  // Categorize temperature
  let category: "warm" | "neutral" | "cool";
  if (kelvin < 4000) category = "warm";
  else if (kelvin <= 6500) category = "neutral";
  else category = "cool";

  return { category, kelvin: Math.round(kelvin) };
}
