import { Session, User } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import jwt from "@helpers/jwt"
import { minute, month } from "@helpers/timeConstants"
import { checkBodyParams, Middleware } from "@middlewares"
import config from "config"


class Login {
    public post: Array<Middleware> = [
        checkBodyParams(["username", "password"]),
        asyncErrorCatcher(async (req, res, next) => {
            const username: string = req.body.username
            const password: string = req.body.password

            const user: User | Error = await User.fromUsername(username)

            if (user instanceof Error) {
                next(user)
                return
            }

            if (!user.isPasswordIsValid(password)) {
                next(new Error("Invalid password"))
                return
            }

            const deviceId: string = req.cookies?.DeviceId

            const session: Session | Error = await (() => {
                if (deviceId) {
                    return Session.fromUserDevice(user, deviceId)
                } else {
                    return Session.create(user)
                }
            })()

            if (session instanceof Error) {
                next(session)
                return
            }

            const refreshToken: string | Error = await jwt.createRefreshTokenFromSession(session)

            if (refreshToken instanceof Error) {
                next(refreshToken)
                return
            }

            const accessToken: string | Error = await jwt.createAccessToken(user)

            if (accessToken instanceof Error) {
                next(accessToken)
                return
            }

            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, domain: config.backendDomain, maxAge: 3 * month })
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, domain: config.backendDomain, maxAge: 20 * minute })
            res.cookie("DeviceId", session.deviceId, { domain: config.backendDomain })

            res.send(user.toNormalView())

            next()
        })]
}

export default new Login()
