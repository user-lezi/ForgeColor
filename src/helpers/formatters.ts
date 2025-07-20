// Clamp helper
const clamp = (value: number, min = 0, max = 255) => Math.max(min, Math.min(max, value));
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/**
 * Returns a string like `rgb(255, 0, 0)`
 */
export function rgbToString({ r, g, b }: { r: number; g: number; b: number }): string {
  return `rgb(${clamp(Math.round(r))}, ${clamp(Math.round(g))}, ${clamp(Math.round(b))})`;
}

/**
 * Returns a string like `rgba(255, 0, 0, 0.5)`
 */
export function rgbaToString({
  r,
  g,
  b,
  a = 1
}: {
  r: number;
  g: number;
  b: number;
  a?: number;
}): string {
  return `rgba(${clamp(Math.round(r))}, ${clamp(Math.round(g))}, ${clamp(Math.round(b))}, ${clamp01(a)})`;
}

/**
 * Returns a string like `hsl(120, 100%, 50%)`
 */
export function hslToString({ h, s, l }: { h: number; s: number; l: number }): string {
  const roundPct = (v: number) => `${Math.round(clamp01(v) * 100)}%`;
  return `hsl(${Math.round(clamp(h, 0, 360))}, ${roundPct(s)}, ${roundPct(l)})`;
}

/**
 * Returns a string like `cmyk(0%, 100%, 100%, 0%)`
 */
export function cmykToString({
  c,
  m,
  y,
  k
}: {
  c: number;
  m: number;
  y: number;
  k: number;
}): string {
  const roundPct = (v: number) => `${Math.round(clamp01(v) * 100)}%`;
  return `cmyk(${roundPct(c)}, ${roundPct(m)}, ${roundPct(y)}, ${roundPct(k)})`;
}

/**
 * Returns a string like `#ff0000`
 */
export function hexToString(hex: string): string {
  const cleaned = hex.trim().replace(/^#/, '');
  return `#${cleaned.toLowerCase()}`;
}
