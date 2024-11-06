import { VerificationCode } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { emailManager, VerificationCodeMail } from "@helpers/email"
import { checkBodyParams, Middleware } from "@middlewares"
import { Email } from "@primitives"

class VerificationCodeRoute {
    public postCreate: Array<Middleware> = [
        checkBodyParams(["email"]),
        asyncErrorCatcher(async (req, res, next) => {
            const email: Email = new Email(req.body.email)

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

            res.sendStatus(200)
        })
    ]
}

export default new VerificationCodeRoute()
