"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookies = setAuthCookies;
exports.clearAuthCookies = clearAuthCookies;
const config_1 = __importDefault(require("../config"));
const timeConstants_1 = require("./timeConstants");
function setAuthCookies(res, accessToken, refreshToken, deviceId) {
    res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "none", domain: config_1.default.backendUrl, maxAge: 2 * timeConstants_1.week });
    res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", domain: config_1.default.backendUrl, maxAge: 20 * timeConstants_1.minute });
    if (deviceId) {
        res.cookie("DeviceId", deviceId, { secure: true, httpOnly: true, domain: config_1.default.backendUrl, sameSite: "none", maxAge: 1000 * timeConstants_1.year });
    }
}
function clearAuthCookies(res) {
    res.clearCookie("RefreshToken");
    res.clearCookie("AccessToken");
}
