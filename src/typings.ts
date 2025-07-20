/**
 * Supported color formats for parsing and conversion.
 */
export enum ColorFormat {
  rgb = "rgb",
  rgba = "rgba",
  hex = "hex",
  hsl = "hsl",
  int = "int",
  cmyk = "cmyk",
}

/**
 * Parsed representation of a color in the specified format.
 */
export type ParsedColorByFormat<T extends ColorFormat = ColorFormat> =
  T extends ColorFormat.hex
    ? { format: ColorFormat.hex; value: string }
    : T extends ColorFormat.rgb
      ? { format: ColorFormat.rgb; r: number; g: number; b: number }
      : T extends ColorFormat.rgba
        ? {
            format: ColorFormat.rgba;
            r: number;
            g: number;
            b: number;
            a: number;
          }
        : T extends ColorFormat.hsl
          ? { format: ColorFormat.hsl; h: number; s: number; l: number }
          : T extends ColorFormat.int
            ? { format: ColorFormat.int; value: number }
            : T extends ColorFormat.cmyk
              ? {
                  format: ColorFormat.cmyk;
                  c: number;
                  m: number;
                  y: number;
                  k: number;
                }
              : never;
