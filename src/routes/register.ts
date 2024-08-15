import getUserByUsername from "@api/get/getUserByUsername"
import { Session, User, VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { emailManager, VerificationCodeMail } from "@helpers/email"
import jwt, { RegisterToken } from "@helpers/jwt"
import { minute, month } from "@helpers/timeConstants"
import { checkBodyParams, contentJson, Middleware } from "@middlewares"
import { Email, Hash } from "@primitives"

class Register {
    public postToken: Array<Middleware> = [
        checkBodyParams(["username", "password", "email"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.fromUsername(req.body.username)

            if (!(user instanceof Error)) {
                next(new Error("There is already user with such username"))
                return
            }

            const token: string = jwt.createRegisterToken(req.body.username, req.body.password, new Email(req.body.email))

            let verificationCode: VerificationCode | Error = await VerificationCode.create(req.body.username)

            if (verificationCode instanceof Error) {
                if (!verificationCode.message.startsWith("There is already verification code for user ")) {
                    next(verificationCode)
                    return
                }

                verificationCode = await VerificationCode.fromUsername(req.body.username)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }

                await verificationCode.delete()

                verificationCode = await VerificationCode.create(req.body.username)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }
            }

            emailManager.sendMail(new VerificationCodeMail(verificationCode), new Email(req.body.email))

            res.send({ registerToken: token })
        })
    ]

    public post: Array<Middleware> = [
        checkBodyParams(["verificationCode", "registerToken"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const payload: RegisterToken | Error = jwt.getRegisterTokenPayload(req.body.registerToken)

            if (payload instanceof Error) {
                next(payload)
                return
            }

            const verificationCode: VerificationCode | Error = await VerificationCode.fromUsername(payload.username)

            if (verificationCode instanceof Error) {
                next(verificationCode)
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

            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 3 * month })
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 20 * minute })
            res.cookie("DeviceId", session.deviceId)

            res.send(user.toNormalView())

            next()
        })]
}

export default new Register()
