import { Session, User } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import jwt from "@helpers/jwt"
import { minute, month } from "@helpers/timeConstants"
import { checkBodyParams, contentJson, Middleware } from "@middlewares"
import { Email, Hash } from "@primitives"

class Register {
    public post: Array<Middleware> = [
        checkBodyParams(["username", "password", "email"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.create(req.body.username, await Hash.hashPassword(req.body.password), new Email(req.body.email))

            if (user instanceof Error) {
                next(user)
                return
            }

            const deviceId: string = req.cookies?.DeviceId
            const session: Session | Error = await Session.create(user, deviceId)

            if (session instanceof Error) {
                next(session)
                return
            }

            const refreshToken: string | Error = await jwt.createRefreshTokenFromSession(session)

            if (refreshToken instanceof Error) {
                next(session)
                return
            }

            const accessToken: string = jwt.createAccessToken(user)

            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 3 * month })
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 20 * minute })
            res.cookie("DeviceId", session.deviceId)

            res.send(user.serialize())
        })]
}

export default new Register()
