"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = void 0;
const helpers_1 = __importDefault(require("./helpers"));
const deleteSession = (0, helpers_1.default)("sessions", "deleteSession");
exports.deleteSession = deleteSession;
