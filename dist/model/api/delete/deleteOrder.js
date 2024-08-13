"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = void 0;
const helpers_1 = __importDefault(require("./helpers"));
const deleteOrder = (0, helpers_1.default)("orders", "deleteOrder");
exports.deleteOrder = deleteOrder;
