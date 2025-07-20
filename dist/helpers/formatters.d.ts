export declare function rgbToString({ r, g, b }: {
    r: number;
    g: number;
    b: number;
}): string;
export declare function rgbaToString({ r, g, b, a }: {
    r: number;
    g: number;
    b: number;
    a?: number;
}): string;
export declare function hslToString({ h, s, l }: {
    h: number;
    s: number;
    l: number;
}): string;
export declare function cmykToString({ c, m, y, k }: {
    c: number;
    m: number;
    y: number;
    k: number;
}): string;
export declare function hexToString(hex: string): string;
