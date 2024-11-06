import { Session, User, VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import jwt from "@helpers/jwt"
import { minute, month } from "@helpers/timeConstants"
import { checkBodyParams, Middleware } from "@middlewares"
import config from "../config"
import { emailManager, PasswordMail } from "@helpers/email"
import { Hash } from "@primitives"


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

            if (!(await user.isPasswordIsValid(password))) {
                next(new Error("Invalid password"))
                return
            }

            const deviceId: string = req.cookies?.DeviceId

            let session: Session | Error = await (() => {
                if (deviceId) {
                    return Session.fromUserDevice(user, deviceId)
                } else {
                    return Session.create(user)
                }
            })()

            if (session instanceof Error) {
                session = await Session.create(user)
            }

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

            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "none", domain: config.backendDomain, maxAge: 3 * month })
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", domain: config.backendDomain, maxAge: 20 * minute })
            res.cookie("DeviceId", session.deviceId, { domain: config.backendDomain, sameSite: "none" })

            res.send(user.toNormalView())

            next()
        })]

    public recoveryPasswordPost: Array<Middleware> = [
        checkBodyParams(["username", "verificationCode"]),
        asyncErrorCatcher(async (req, res, next) => {
            const username: string = req.body.username
            const code: number = req.body.verificationCode

            const user: User | Error = await User.fromUsername(username)

            if (user instanceof Error) {
                next(user)
                return
            }

            const verificationCode: VerificationCode | Error = await VerificationCode.fromEmail(user.email)

            if (verificationCode instanceof Error) {
                next(verificationCode)
                return
            }

            if (!(await verificationCode.compare(code))) {
                next(new Error("Invalid verification code!"))
                return
            }

            const password = (Math.random() * (1 << 32)).toString(16)

            const response: void | Error = await user.edit({ passwordHash: await Hash.hashPassword(password) })

            if (response instanceof Error) {
                next(response)
                return
            }

            emailManager.sendMail(new PasswordMail(password), user.email)

            res.send(200)
        })
    ]
}

export default new Login()
