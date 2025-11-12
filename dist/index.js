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
    options;
    static Colors = require("../colors.json");
    constructor(options = {}) {
        super();
        const opts = { customColorNames: [] };
        if (options.customColorNames?.length) {
            for (const color of options.customColorNames) {
                if (!color.name || typeof color.name !== "string")
                    throw new Error(`Invalid color name: ${color.name}`);
                if (!color.color ||
                    (typeof color.color !== "string" && typeof color.color !== "number"))
                    throw new Error(`Invalid color value for "${color.name}"`);
                let value;
                if (typeof color.color === "number") {
                    if (color.color < 0x000000 || color.color > 0xffffff)
                        throw new Error(`Numeric color value for "${color.name}" must be between 0x000000 and 0xFFFFFF.`);
                    value = color.color;
                }
                else {
                    const result = helpers_1.ColorConverter.convert(color.color, typings_1.ColorFormat.hex);
                    if (!result)
                        throw new Error(`Could not convert string color "${color.color}" to hex.`);
                    value = parseInt(result.replace("#", ""), 16);
                }
                if (ForgeColor.IsNamedColor(color.name))
                    throw new Error(`Color name "${color.name}" already exists.`);
                ForgeColor.Colors.push({ name: color.name, value });
                opts.customColorNames.push(color);
            }
        }
        this.options = opts;
    }
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
