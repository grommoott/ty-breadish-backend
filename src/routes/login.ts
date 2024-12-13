import { Session, User, VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import jwt from "@helpers/jwt"
import { checkBodyParams, Middleware } from "@middlewares"
import { emailManager, PasswordMail } from "@helpers/email"
import { Hash } from "@primitives"
import { clearAuthCookies, setAuthCookies } from "@helpers"
import { Role } from "@enums"


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

            setAuthCookies(res, accessToken, refreshToken, session.deviceId)

            const role: Role | Error = await user.getRole()

            if (role instanceof Error) {
                next(role)
                return
            }

            res.send(user.toNormalView({ role }))

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

            const password = Math.round(Math.random() * (1 << 32)).toString(16)

            const response: void | Error = await user.edit({ passwordHash: await Hash.hashPassword(password) })

            if (response instanceof Error) {
                next(response)
                return
            }

            emailManager.sendMail(new PasswordMail(password), user.email)

            res.sendStatus(200)
        })
    ]

    public postLogout: Array<Middleware> = [
        asyncErrorCatcher(async (req, res, next) => {
            clearAuthCookies(res)

            res.sendStatus(200)

            next()
        })
    ]
}

export default new Login()
