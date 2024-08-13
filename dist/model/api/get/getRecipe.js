"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("@interfaces");
const helpers_1 = __importDefault(require("./helpers"));
const getRecipe = (0, helpers_1.default)("recipes", "Recipe", _interfaces_1.queryRowToRecipe);
exports.default = getRecipe;
