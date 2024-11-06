"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const email_1 = require("@helpers/email");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
class VerificationCodeRoute {
    postCreate = [
        (0, _middlewares_1.checkBodyParams)(["email"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const email = new _primitives_1.Email(req.body.email);
            let verificationCode = await _entities_1.VerificationCode.create(email);
            if (verificationCode instanceof Error) {
                if (!verificationCode.message.startsWith("There is already verification code for email ")) {
                    next(verificationCode);
                    return;
                }
                verificationCode = await _entities_1.VerificationCode.fromEmail(email);
                if (verificationCode instanceof Error) {
                    next(verificationCode);
                    return;
                }
                const del = await verificationCode.delete();
                if (del instanceof Error) {
                    next(del);
                    return;
                }
                verificationCode = await _entities_1.VerificationCode.create(email);
                if (verificationCode instanceof Error) {
                    next(verificationCode);
                    return;
                }
            }
            email_1.emailManager.sendMail(new email_1.VerificationCodeMail(verificationCode), email);
            res.sendStatus(200);
        })
    ];
}
exports.default = new VerificationCodeRoute();
