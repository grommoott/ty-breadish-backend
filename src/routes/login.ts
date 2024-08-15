import { Session, User } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import jwt from "@helpers/jwt"
import { minute, month } from "@helpers/timeConstants"
import { checkBodyParams, Middleware } from "@middlewares"


class Login {
    public post: Array<Middleware> = [
        checkBodyParams(["username", "password"]),
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.fromAuth(req.body.username, req.body.password)

            if (user instanceof Error) {
                next(user)
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

            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: true, maxAge: 2 * month })
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: true, maxAge: 20 * minute })
            res.cookie("DeviceId", session.deviceId)

            res.send(user.toNormalView())

            next()
        })]
}

export default new Login()
