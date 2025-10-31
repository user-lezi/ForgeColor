"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contrastRatio = contrastRatio;
function contrastRatio(rgb1, rgb2) {
    const luminance = (rgb) => {
        const srgb = [rgb.r, rgb.g, rgb.b].map((v) => {
            const val = v / 255;
            return val <= 0.03928
                ? val / 12.92
                : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    };
    const L1 = luminance(rgb1);
    const L2 = luminance(rgb2);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    return parseFloat(ratio.toFixed(2));
}
