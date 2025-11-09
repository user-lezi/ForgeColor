import { ForgeExtension } from "@tryforge/forgescript";
import { NamedColor, RGB } from "./typings";
export declare class ForgeColor extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    static Colors: Array<{
        name: NamedColor;
        value: number;
    }>;
    init(): void;
    static GetColorFromName(name: NamedColor): number | null;
    static GetNameFromColor(value: number): NamedColor | null;
    static IsNamedColor(name: string): name is NamedColor;
    static FindClosestName(value: number | RGB, n?: number): Array<{
        name: NamedColor;
        value: number;
        distance: number;
    }>;
}
export * from "./helpers";
export * from "./typings";
