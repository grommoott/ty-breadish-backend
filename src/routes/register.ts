import { Session, User, VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { emailManager, VerificationCodeMail } from "@helpers/email"
import jwt, { RegisterToken } from "@helpers/jwt"
import { checkBodyParams, contentJson, Middleware } from "@middlewares"
import { Email, Hash } from "@primitives"
import { setAuthCookies } from "@helpers/authCookies"
import { Role } from "@enums"

class Register {
    public postToken: Array<Middleware> = [
        checkBodyParams(["username", "password", "email"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const username: string = req.body.username
            const password: string = req.body.password
            const email: Email = new Email(req.body.email)

            const user: User | Error = await User.fromUsername(username)

            if (!(user instanceof Error)) {
                next(new Error("There is already user with such username"))
                return
            }

            const token: string = jwt.createRegisterToken(username, password, email)

            let verificationCode: VerificationCode | Error = await VerificationCode.create(email)

            if (verificationCode instanceof Error) {
                if (!verificationCode.message.startsWith("There is already verification code for email ")) {
                    next(verificationCode)
                    return
                }

                verificationCode = await VerificationCode.fromEmail(email)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }

                const del: boolean | Error = await verificationCode.delete()

                if (del instanceof Error) {
                    next(del)
                    return
                }

                verificationCode = await VerificationCode.create(email)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }
            }

            emailManager.sendMail(new VerificationCodeMail(verificationCode), email)

            res.send({ registerToken: token })
        })
    ]

    public post: Array<Middleware> = [
        checkBodyParams(["verificationCode", "registerToken"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const code: number = req.body.verificationCode
            const registerToken = req.body.registerToken

            const payload: RegisterToken | Error = jwt.getRegisterTokenPayload(registerToken)

            if (payload instanceof Error) {
                next(payload)
                return
            }

            const verificationCode: VerificationCode | Error = await VerificationCode.fromEmail(new Email(payload.email))

            if (verificationCode instanceof Error) {
                next(verificationCode)
                return
            }

            const isValid: boolean | Error = await verificationCode.compare(code)

            if (isValid instanceof Error) {
                next(isValid)
                return
            }

            if (!isValid) {
                next(new Error("Invalid verification code"))
                return
            }

            if (!verificationCode.isFresh) {
                next(new Error("Verification code has expired"))
                return
            }

            const user: User | Error = await User.create(payload.username, await Hash.hashPassword(payload.password), new Email(payload.email))

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
}

export default new Register()
