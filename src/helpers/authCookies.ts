import { Response } from "express";
import config from "../config";
import { minute, week, year } from "./timeConstants";

function setAuthCookies(res: Response, accessToken: string, refreshToken: string, deviceId?: string) {
    res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "none", domain: config.backendUrl, maxAge: 2 * week })
    res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", domain: config.backendUrl, maxAge: 20 * minute })

    if (deviceId) {
        res.cookie("DeviceId", deviceId, { secure: true, httpOnly: true, domain: config.backendUrl, sameSite: "none", maxAge: 1000 * year })
    }
}

function clearAuthCookies(res: Response) {
    res.clearCookie("RefreshToken")
    res.clearCookie("AccessToken")
}

export { setAuthCookies, clearAuthCookies }
