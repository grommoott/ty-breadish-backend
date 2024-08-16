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

            const verificationCode: VerificationCode | Error = await VerificationCode.create(user.username)

            if (verificationCode instanceof Error) {
                next(verificationCode)
                return
            }

            emailManager.sendMail(new VerificationCodeMail(verificationCode), user.email)

            res.sendStatus(200)
        })
    ]
}

export default new VerificationCodeRoute()
