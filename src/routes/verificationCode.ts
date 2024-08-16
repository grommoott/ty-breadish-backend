import { User, VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { emailManager, VerificationCodeMail } from "@helpers/email"
import { checkAuthorized, Middleware } from "@middlewares"
import { UserId } from "@primitives"

class VerificationCodeRoute {
    public postCreate: Array<Middleware> = [
        checkAuthorized,
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            let verificationCode: VerificationCode | Error = await VerificationCode.create(user.email)

            if (verificationCode instanceof Error) {
                if (!verificationCode.message.startsWith("There is already verification code for email ")) {
                    next(verificationCode)
                    return
                }

                verificationCode = await VerificationCode.fromEmail(user.email)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }

                const del: boolean | Error = await verificationCode.delete()

                if (del instanceof Error) {
                    next(del)
                    return
                }

                verificationCode = await VerificationCode.create(user.email)

                if (verificationCode instanceof Error) {
                    next(verificationCode)
                    return
                }
            }

            emailManager.sendMail(new VerificationCodeMail(verificationCode), user.email)

            res.sendStatus(200)
        })
    ]
}

export default new VerificationCodeRoute()
