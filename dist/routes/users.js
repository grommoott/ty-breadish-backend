"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
class Users {
    getUsernameAvailable = [
        (0, _middlewares_1.checkParams)(["username"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const username = req.params.username;
            const user = await _entities_1.User.fromUsername(username);
            if (user instanceof Error) {
                if (user.message.startsWith("User with such username")) {
                    res.send(false);
                    next();
                    return;
                }
                next(user);
                return;
            }
            res.send(true);
            next();
        })
    ];
    getEmailAvailable = [
        (0, _middlewares_1.checkParams)(["email"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const email = new _primitives_1.Email(req.params.email);
            const user = await _entities_1.User.fromEmail(email);
            if (user instanceof Error) {
                if (user.message.startsWith("User with such email")) {
                    res.send(false);
                    next();
                    return;
                }
                next(user);
                return;
            }
            res.send(true);
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["verificationCode", "password"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const code = parseInt(req.params.verificationCode);
            const password = req.params.password;
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            if (!await user.isPasswordIsValid(password)) { // TODO
                next(new Error("Invalid password!"));
                return;
            }
            const verificationCode = await _entities_1.VerificationCode.fromEmail(user.email);
            if (verificationCode instanceof Error) {
                next(verificationCode);
                return;
            }
            if (!await verificationCode.compare(code)) {
                next(new Error("Invalid verificationCode"));
                return;
            }
            const del = await user.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    put = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["password"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const password = req.body.password;
            const username = req.body.username;
            const newPassword = req.body.newPassword;
            const email = new _primitives_1.Email(req.body.email);
            const code = req.body.verificationCode;
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            if (!user.isPasswordIsValid(password)) {
                next(new Error("Invalid password!"));
                return;
            }
            if (username) {
                const userWithUsername = await _entities_1.User.fromUsername(username);
                if (!(userWithUsername instanceof Error)) {
                    next(new Error(`User with such username(${username}) is already exists`));
                    return;
                }
            }
            if (email) {
                const userWithEmail = await _entities_1.User.fromEmail(email);
                if (!(userWithEmail instanceof Error)) {
                    next(new Error(`User with such email(${email}) is already exists`));
                    return;
                }
            }
            const newEmail = email || user.email;
            if (newPassword || email) {
                if (!code) {
                    next(new Error("To update password or email you must also send verification code"));
                    return;
                }
                const verificationCode = await _entities_1.VerificationCode.fromEmail(newEmail);
                if (verificationCode instanceof Error) {
                    next(verificationCode);
                    return;
                }
                if (!verificationCode.compare(code)) {
                    next(new Error("Invalid verification code"));
                    return;
                }
            }
            const edit = await user.edit({ username, passwordHash: newPassword ? new _primitives_1.Hash(newPassword) : undefined, email: email });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new Users();
