import { ColorFormat } from "../typings";
export declare const ColorParserPatterns: {
    hex: RegExp;
    rgb: RegExp;
    rgba: RegExp;
    hsl: RegExp;
    cmyk: RegExp;
    int: RegExp;
};
export declare function detectColorFormat(input: string): ColorFormat | null;
