import { RGB } from "../typings";

const clamp = (v: number) => Math.max(0, Math.min(255, v));

/**
 * Darkens a color by blending it with black.
 * @param color RGB input
 * @param percent Amount to darken (0–1)
 */
export function shade(color: RGB, percent: number): RGB {
  const t = Math.max(0, Math.min(1, percent));
  return {
    r: clamp(color.r * (1 - t)),
    g: clamp(color.g * (1 - t)),
    b: clamp(color.b * (1 - t)),
  };
}

/**
 * Lightens a color by blending it with white.
 * @param color RGB input
 * @param percent Amount to lighten (0–1)
 */
export function tint(color: RGB, percent: number): RGB {
  const t = Math.max(0, Math.min(1, percent));
  return {
    r: clamp(color.r + (255 - color.r) * t),
    g: clamp(color.g + (255 - color.g) * t),
    b: clamp(color.b + (255 - color.b) * t),
  };
}
