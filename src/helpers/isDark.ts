export function isDarkColor(
  rgb: [number, number, number],
  threshold: number = 0.5,
): boolean {
  // Convert to linear sRGB
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  // Relative luminance (WCAG standard)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance < threshold;
}
