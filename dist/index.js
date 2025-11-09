"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeColor = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("./typings");
const helpers_1 = require("./helpers");
class ForgeColor extends forgescript_1.ForgeExtension {
    name = "ForgeColor";
    description = require("../package.json").description;
    version = require("../package.json").version;
    static Colors = require("../colors.json");
    init() {
        this.load(`${__dirname}/functions`);
    }
    static GetColorFromName(name) {
        const lower = name.toLowerCase();
        const found = this.Colors.find((c) => c.name.toLowerCase() === lower);
        return found?.value ?? null;
    }
    static GetNameFromColor(value) {
        const found = this.Colors.find((c) => c.value === value);
        return found?.name ?? null;
    }
    static IsNamedColor(name) {
        return this.Colors.some((c) => c.name.toLowerCase() === name.toLowerCase());
    }
    static FindClosestName(value, n = 1) {
        const targetRGB = typeof value === "number"
            ? { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 }
            : value;
        const results = this.Colors.map((c) => {
            const rgb = {
                r: (c.value >> 16) & 255,
                g: (c.value >> 8) & 255,
                b: c.value & 255,
            };
            return {
                ...c,
                distance: (0, helpers_1.colorDistance)(targetRGB, rgb, typings_1.ColorDistanceMode.CIE76),
            };
        });
        return results.sort((a, b) => a.distance - b.distance).slice(0, n);
    }
}
exports.ForgeColor = ForgeColor;
__exportStar(require("./helpers"), exports);
__exportStar(require("./typings"), exports);
