import { Session, User } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import jwt, { RefreshToken } from "@helpers/jwt"
import { minute, month } from "@helpers/timeConstants"
import { Middleware } from "@middlewares"
import { UserId } from "@primitives"

class AccessToken {
    public get: Array<Middleware> = [
        asyncErrorCatcher(async (req, res, next) => {
            if (!req.cookies.RefreshToken) {
                next(new Error("Unauthorized!", { cause: 401 }))
                return
            }

            const payload: RefreshToken | Error = jwt.getRefreshTokenPayload(req.cookies.RefreshToken)

            if (payload instanceof Error) {
                next(payload)
                return
            }

            const user: User | Error = await User.fromId(new UserId(payload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const deviceId: string = req.cookies?.DeviceId
            const session: Session | Error = await Session.fromUserDevice(user, deviceId)

            if (session instanceof Error) {
                next(session)
                return
            }

            const newRefreshToken: string | Error = await jwt.createRefreshTokenFromSession(session)

            if (newRefreshToken instanceof Error) {
                next(newRefreshToken)
                return
            }

            const newAccessToken: string | Error = await jwt.createAccessToken(user)

            if (newAccessToken instanceof Error) {
                next(newAccessToken)
                return
            }

            res.cookie("RefreshToken", newRefreshToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 2 * month })
            res.cookie("AccessToken", newAccessToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 20 * minute })

            res.sendStatus(200)

            next()
        })
    ]
}

export default new AccessToken()
