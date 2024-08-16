"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const email_1 = require("@helpers/email");
const jwt_1 = __importDefault(require("@helpers/jwt"));
const timeConstants_1 = require("@helpers/timeConstants");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
class Register {
    postToken = [
        (0, _middlewares_1.checkBodyParams)(["username", "password", "email"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            const user = await _entities_1.User.fromUsername(username);
            if (!(user instanceof Error)) {
                next(new Error("There is already user with such username"));
                return;
            }
            const token = jwt_1.default.createRegisterToken(username, password, email);
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
                if (verificationCode.isFresh) {
                    next("Another user already trying to register an account with this email, sorry you're late :(");
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
            res.send({ registerToken: token });
        })
    ];
    post = [
        (0, _middlewares_1.checkBodyParams)(["verificationCode", "registerToken"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const code = req.body.verificationCode;
            const registerToken = req.body.registerToken;
            const payload = jwt_1.default.getRegisterTokenPayload(registerToken);
            if (payload instanceof Error) {
                next(payload);
                return;
            }
            const verificationCode = await _entities_1.VerificationCode.fromEmail(new _primitives_1.Email(payload.email));
            if (verificationCode instanceof Error) {
                next(verificationCode);
                return;
            }
            const isValid = await verificationCode.compare(code);
            if (isValid instanceof Error) {
                next(isValid);
                return;
            }
            if (!isValid) {
                next(new Error("Invalid verification code"));
                return;
            }
            if (!verificationCode.isFresh) {
                next(new Error("Verification code has expired"));
                return;
            }
            const user = await _entities_1.User.create(payload.username, await _primitives_1.Hash.hashPassword(payload.password), new _primitives_1.Email(payload.email));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const deviceId = req.cookies?.DeviceId;
            const session = await _entities_1.Session.create(user, deviceId);
            if (session instanceof Error) {
                next(session);
                return;
            }
            const refreshToken = await jwt_1.default.createRefreshTokenFromSession(session);
            if (refreshToken instanceof Error) {
                next(session);
                return;
            }
            const accessToken = await jwt_1.default.createAccessToken(user);
            if (accessToken instanceof Error) {
                next(accessToken);
                return;
            }
            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 3 * timeConstants_1.month });
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "strict", maxAge: 20 * timeConstants_1.minute });
            res.cookie("DeviceId", session.deviceId);
            res.send(user.toNormalView());
            next();
        })
    ];
}
exports.default = new Register();
