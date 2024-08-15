"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailManager {
    _smtp;
    _mailPassword;
    sendMail(message, to) {
        this._smtp.sendMail({
            from: "\"TyBreadish\" <tybreadish@mail.ru>",
            to: to.email,
            subject: "Test",
            text: message,
            html: `<p style="font-size: 2rem;">${message}</p>`
        });
    }
    constructor() {
        this._mailPassword = "mV2z5Tb11DzpSBik4AXd"; // process.env.MAIL_PASSWORD
        this._smtp = nodemailer_1.default.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: "tybreadish@mail.ru",
                pass: this._mailPassword
            }
        });
    }
}
exports.default = new EmailManager();
