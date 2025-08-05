"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlendMode = exports.ColorChannels = exports.ColorFormat = void 0;
var ColorFormat;
(function (ColorFormat) {
    ColorFormat["rgb"] = "rgb";
    ColorFormat["rgba"] = "rgba";
    ColorFormat["hex"] = "hex";
    ColorFormat["hsl"] = "hsl";
    ColorFormat["int"] = "int";
    ColorFormat["cmyk"] = "cmyk";
})(ColorFormat || (exports.ColorFormat = ColorFormat = {}));
var ColorChannels;
(function (ColorChannels) {
    ColorChannels["red"] = "red";
    ColorChannels["green"] = "green";
    ColorChannels["blue"] = "blue";
    ColorChannels["alpha"] = "alpha";
    ColorChannels["hue"] = "hue";
    ColorChannels["saturation"] = "saturation";
    ColorChannels["lightness"] = "lightness";
    ColorChannels["cyan"] = "cyan";
    ColorChannels["magenta"] = "magenta";
    ColorChannels["yellow"] = "yellow";
    ColorChannels["key"] = "key";
})(ColorChannels || (exports.ColorChannels = ColorChannels = {}));
var BlendMode;
(function (BlendMode) {
    BlendMode["average"] = "average";
    BlendMode["additive"] = "additive";
    BlendMode["screen"] = "screen";
    BlendMode["multiply"] = "multiply";
    BlendMode["gamma"] = "gamma";
})(BlendMode || (exports.BlendMode = BlendMode = {}));
