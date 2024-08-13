"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("./helpers"));
const _interfaces_1 = require("@interfaces");
const getUser = (0, helpers_1.default)("users", "User", _interfaces_1.queryRowToUser);
exports.default = getUser;
