import { ForgeExtension } from "@tryforge/forgescript";
import { NamedColor, RGB } from "./typings";
export interface IForgeColorOptions {
    customColorNames: Array<{
        name: string;
        color: string | number;
    }>;
}
export declare class ForgeColor extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    private options;
    static Colors: Array<{
        name: NamedColor;
        value: number;
    }>;
    constructor(options?: Partial<IForgeColorOptions>);
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
