"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailManager = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const _config_1 = __importDefault(require("@config"));
class EmailManager {
    _smtp;
    _mailPassword;
    sendMail(mail, to) {
        this._smtp.sendMail({
            from: "\"TyBreadish\" <gregorshuv@yandex.ru>",
            to: to.email,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        });
    }
    constructor() {
        this._mailPassword = _config_1.default.mailPassword;
        this._smtp = nodemailer_1.default.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: "gregorshuv@yandex.ru",
                pass: this._mailPassword
            }
        });
    }
}
const emailManager = new EmailManager();
exports.emailManager = emailManager;
