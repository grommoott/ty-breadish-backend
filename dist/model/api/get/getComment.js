"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("@interfaces");
const helpers_1 = __importDefault(require("./helpers"));
const getComment = (0, helpers_1.default)("comments", "Comment", _interfaces_1.queryRowToComment);
exports.default = getComment;
