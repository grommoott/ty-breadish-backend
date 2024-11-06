"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordMail = exports.VerificationCodeMail = exports.Mail = void 0;
const fs_1 = __importDefault(require("fs"));
const hbs_1 = require("hbs");
const path_1 = __importDefault(require("path"));
class Mail {
    subject;
    text;
    html;
    constructor(subject, text, html) {
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
}
exports.Mail = Mail;
class VerificationCodeMail extends Mail {
    static _template = (() => {
        const markup = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../hbs/email/verifyCodeMail.hbs")).toString();
        return hbs_1.handlebars.compile(markup);
    })();
    constructor(verificationCode) {
        super("Code Verification", `This is your verification code: ${verificationCode.code}`, VerificationCodeMail._template({ code: verificationCode.code }));
    }
}
exports.VerificationCodeMail = VerificationCodeMail;
class PasswordMail extends Mail {
    static _template = (() => {
        const markup = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../hbs/email/verifyCodeMail.hbs")).toString();
        return hbs_1.handlebars.compile(markup);
    })();
    constructor(password) {
        super("Password", `This is your password: ${password}`, PasswordMail._template({ password }));
    }
}
exports.PasswordMail = PasswordMail;
