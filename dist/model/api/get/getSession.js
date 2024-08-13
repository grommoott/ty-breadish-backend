"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = void 0;
const _interfaces_1 = require("@interfaces");
const helpers_1 = __importDefault(require("./helpers"));
const getSession = (0, helpers_1.default)("sessions", "Session", _interfaces_1.queryRowToSession);
exports.getSession = getSession;
