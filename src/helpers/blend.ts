import { BlendMode } from "../typings";

export function blendRGB(
  a: [number, number, number],
  b: [number, number, number],
  mode: BlendMode = BlendMode.average,
  t: number = 0.5,
): [number, number, number] {
  const clamp = (x: number) => Math.max(0, Math.min(255, x));
  const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;

  // toLinear(c) = c / 12.92                if c ≤ 0.04045
  //             = ((c + 0.055) / 1.055)^2.4  otherwise
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  // toSRGB(c) = 12.92 * c                 if c ≤ 0.0031308
  //           = 1.055 * c^(1/2.4) - 0.055   otherwise
  const toSRGB = (c: number) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

  const result: [number, number, number] = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    const A = a[i];
    const B = b[i];
    let val = 0;

    switch (mode) {
      case BlendMode.average:
        // val = (1 - t) * A + t * B
        val = lerp(A, B, t);
        break;

      case BlendMode.additive:
        // val = min(A + B, 255)
        val = clamp(A + B);
        break;

      case BlendMode.screen:
        // val = 255 - ((255 - A) * (255 - B)) / 255
        val = 255 - ((255 - A) * (255 - B)) / 255;
        break;

      case BlendMode.multiply:
        // val = (A * B) / 255
        val = (A * B) / 255;
        break;

      case BlendMode.gamma:
        // val = toSRGB((1 - t) * toLinear(A / 255) + t * toLinear(B / 255)) * 255
        const la = toLinear(A / 255);
        const lb = toLinear(B / 255);
        const mixed = lerp(la, lb, t);
        val = clamp(Math.round(toSRGB(mixed) * 255));
        break;
    }

    result[i] = clamp(Math.round(val));
  }

  return result;
}
