import { RGB } from "../typings";
export declare function rgbFromKelvin(k: number): RGB;
export declare function rgbTemperature({ r, g, b }: RGB): {
    category: "warm" | "neutral" | "cool";
    kelvin: number;
};
