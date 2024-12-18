import { Email } from "@primitives"
import nodemailer from "nodemailer"
import { Mail } from "./mail"
import config from "config"

class EmailManager {
    private _smtp: nodemailer.Transporter
    private _mailPassword: string

    public sendMail(mail: Mail, to: Email): void {
        this._smtp.sendMail({
            from: "\"TyBreadish\" <tybreadish@mail.ru>",
            to: to.email,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        })
    }

    public constructor() {
        this._mailPassword = config.mailPassword

        this._smtp = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: "tybreadish@mail.ru",
                pass: this._mailPassword
            }
        })
    }
}

const emailManager = new EmailManager()

export { emailManager }
