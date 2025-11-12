"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNamedColor = isNamedColor;
exports.searchColorName = searchColorName;
const __1 = require("..");
function isNamedColor(name) {
    return __1.ForgeColor.IsNamedColor(name);
}
function searchColorName(query, limit = 5) {
    const lowerQuery = query.toLowerCase();
    return __1.ForgeColor.Colors.filter((c) => c.name.toLowerCase().includes(lowerQuery)).slice(0, limit);
}
