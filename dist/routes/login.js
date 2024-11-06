"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const jwt_1 = __importDefault(require("@helpers/jwt"));
const timeConstants_1 = require("@helpers/timeConstants");
const _middlewares_1 = require("@middlewares");
const config_1 = __importDefault(require("../config"));
const email_1 = require("@helpers/email");
const _primitives_1 = require("@primitives");
class Login {
    post = [
        (0, _middlewares_1.checkBodyParams)(["username", "password"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const username = req.body.username;
            const password = req.body.password;
            const user = await _entities_1.User.fromUsername(username);
            if (user instanceof Error) {
                next(user);
                return;
            }
            if (!(await user.isPasswordIsValid(password))) {
                next(new Error("Invalid password"));
                return;
            }
            const deviceId = req.cookies?.DeviceId;
            let session = await (() => {
                if (deviceId) {
                    return _entities_1.Session.fromUserDevice(user, deviceId);
                }
                else {
                    return _entities_1.Session.create(user);
                }
            })();
            if (session instanceof Error) {
                session = await _entities_1.Session.create(user);
            }
            if (session instanceof Error) {
                next(session);
                return;
            }
            const refreshToken = await jwt_1.default.createRefreshTokenFromSession(session);
            if (refreshToken instanceof Error) {
                next(refreshToken);
                return;
            }
            const accessToken = await jwt_1.default.createAccessToken(user);
            if (accessToken instanceof Error) {
                next(accessToken);
                return;
            }
            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "none", domain: config_1.default.backendDomain, maxAge: 3 * timeConstants_1.month });
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", domain: config_1.default.backendDomain, maxAge: 20 * timeConstants_1.minute });
            res.cookie("DeviceId", session.deviceId, { domain: config_1.default.backendDomain, sameSite: "none" });
            res.send(user.toNormalView());
            next();
        })
    ];
    recoveryPasswordPost = [
        (0, _middlewares_1.checkBodyParams)(["username", "verificationCode"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const username = req.body.username;
            const code = req.body.verificationCode;
            const user = await _entities_1.User.fromUsername(username);
            if (user instanceof Error) {
                next(user);
                return;
            }
            const verificationCode = await _entities_1.VerificationCode.fromEmail(user.email);
            if (verificationCode instanceof Error) {
                next(verificationCode);
                return;
            }
            if (!(await verificationCode.compare(code))) {
                next(new Error("Invalid verification code!"));
                return;
            }
            const password = (Math.random() * (1 << 32)).toString(16);
            const response = await user.edit({ passwordHash: await _primitives_1.Hash.hashPassword(password) });
            if (response instanceof Error) {
                next(response);
                return;
            }
            email_1.emailManager.sendMail(new email_1.PasswordMail(password), user.email);
            res.send(200);
        })
    ];
}
exports.default = new Login();
