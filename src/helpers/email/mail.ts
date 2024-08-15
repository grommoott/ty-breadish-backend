import { VerificationCode } from "@entities"
import fs from "fs"
import { handlebars } from "hbs"
import path from "path"

class Mail {
    public subject: string
    public text: string
    public html: string

    public constructor(subject: string, text: string, html: string) {
        this.subject = subject
        this.text = text
        this.html = html
    }
}

class VerificationCodeMail extends Mail {
    private static _template: HandlebarsTemplateDelegate = (() => {
        const markup = fs.readFileSync(path.join(__dirname, "../../../hbs/email/verifyCodeMail.hbs")).toString()
        return handlebars.compile(markup)
    })()

    public constructor(verificationCode: VerificationCode) {
        super("Code Verification", `This is your verification code: ${verificationCode.code}`, VerificationCodeMail._template({ code: verificationCode.code }))
    }
}

export { Mail, VerificationCodeMail }
