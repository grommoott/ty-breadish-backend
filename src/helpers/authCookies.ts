import { Response } from "express";
import config from "../config";
import { minute, week } from "./timeConstants";

function setAuthCookies(res: Response, accessToken: string, refreshToken: string, deviceId: string) {
    res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "none", domain: config.backendDomain, maxAge: 2 * week })
    res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", domain: config.backendDomain, maxAge: 20 * minute })
    res.cookie("DeviceId", deviceId, { secure: true, httpOnly: true, domain: config.backendDomain, sameSite: "none" })
}

function clearAuthCookies(res: Response) {
    res.clearCookie("RefreshToken")
    res.clearCookie("AccessToken")
}

export { setAuthCookies, clearAuthCookies }
