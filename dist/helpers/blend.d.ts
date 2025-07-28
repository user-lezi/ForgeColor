export declare enum BlendMode {
    average = "average",
    additive = "additive",
    screen = "screen",
    multiply = "multiply",
    gamma = "gamma"
}
export declare function blendRGB(a: [number, number, number], b: [number, number, number], mode?: BlendMode, t?: number): [number, number, number];
