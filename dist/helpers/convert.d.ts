import { ColorFormat } from "../typings";
export declare class ColorConverter {
    #private;
    static convert(input: string, to: ColorFormat): string | null;
    static hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    };
    static rgbToHex({ r, g, b }: {
        r: number;
        g: number;
        b: number;
    }): string;
    static hslToRgb(h: number, s: number, l: number): {
        r: number;
        g: number;
        b: number;
    };
    static rgbToHsl({ r, g, b }: {
        r: number;
        g: number;
        b: number;
    }): {
        h: number;
        s: number;
        l: number;
    };
    static cmykToRgb(c: number, m: number, y: number, k: number): {
        r: number;
        g: number;
        b: number;
    };
    static rgbToCmyk({ r, g, b }: {
        r: number;
        g: number;
        b: number;
    }): {
        c: number;
        m: number;
        y: number;
        k: number;
    };
}
