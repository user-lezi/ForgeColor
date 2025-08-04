import { RGB } from "../typings";
import { blendRGB, BlendMode } from "./blend";

export function generateGradient(
  colors: RGB[],
  steps: number,
  includeStops = false,
  mode: BlendMode = BlendMode.average,
): RGB[] {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

  if (colors.length < 2) {
    throw new Error(
      "At least two colors are required for gradient generation.",
    );
  }

  const result: RGB[] = [];

  const segments = colors.length - 1;
  const stepsPerSegment = steps;

  for (let i = 0; i < segments; i++) {
    const start = colors[i];
    const end = colors[i + 1];

    const stepsInSegment = stepsPerSegment;

    for (let j = 0; j < stepsInSegment; j++) {
      const t = j / stepsInSegment;
      const blended = blendRGB(
        [start.r, start.g, start.b],
        [end.r, end.g, end.b],
        mode,
        t,
      );
      result.push({
        r: clamp(blended[0]),
        g: clamp(blended[1]),
        b: clamp(blended[2]),
      });
    }
  }

  if (includeStops) {
    result.unshift(colors[0]);
    result.push(colors[colors.length - 1]);
  }

  return result;
}
