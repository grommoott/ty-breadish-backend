"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const _interfaces_1 = require("@interfaces");
const getFeatured = (0, helpers_1.default)("featured", "Featured", _interfaces_1.queryRowToFeatured);
exports.default = getFeatured;
