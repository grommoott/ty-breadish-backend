"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const images_1 = __importDefault(require("./images"));
const _enums_1 = require("@enums");
class Users {
    getUsernameAvailable = [
        (0, _middlewares_1.checkParams)(["username"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const username = decodeURIComponent(req.params.username);
            const user = await _entities_1.User.fromUsername(username);
            if (user instanceof Error) {
                if (user.message.startsWith("User with such username")) {
                    res.send(true);
                    next();
                    return;
                }
                next(user);
                return;
            }
            res.send(false);
            next();
        })
    ];
    getEmailAvailable = [
        (0, _middlewares_1.checkParams)(["email"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const email = new _primitives_1.Email(decodeURIComponent(req.params.email));
            const user = await _entities_1.User.fromEmail(email);
            if (user instanceof Error) {
                if (user.message.startsWith("User with such email")) {
                    res.send(true);
                    next();
                    return;
                }
                next(user);
                return;
            }
            res.send(false);
            next();
        })
    ];
    getIsPasswordIsValid = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["password"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const password = decodeURIComponent(req.params.password);
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            res.send(await user.isPasswordIsValid(password));
        })
    ];
    getUsername = [
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.UserId(req.params.id);
            const user = await _entities_1.User.fromId(id);
            if (user instanceof Error) {
                next(user);
                return;
            }
            res.send(user.username);
        })
    ];
    get = [
        _middlewares_1.checkAuthorized,
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const role = await user.getRole();
            if (role instanceof Error) {
                next(role);
                return;
            }
            res.send(user.toNormalView({ role }));
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["verificationCode", "password"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const code = parseInt(req.params.verificationCode);
            const password = decodeURIComponent(req.params.password);
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            if (!(await user.isPasswordIsValid(password))) { // TODO
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
            const email = req.body.email == undefined ? undefined : new _primitives_1.Email(req.body.email);
            const code = req.body.verificationCode;
            const newCode = req.body.newVerificationCode;
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            if (!(await user.isPasswordIsValid(password))) {
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
            if (newPassword || email) {
                if (!code) {
                    next(new Error("To update password or email you must also send verification code"));
                    return;
                }
                const verificationCode = await _entities_1.VerificationCode.fromEmail(user.email);
                if (verificationCode instanceof Error) {
                    next(verificationCode);
                    return;
                }
                if (!(await verificationCode.compare(code))) {
                    next(new Error("Invalid verification code"));
                    return;
                }
                if (email) {
                    if (!newCode) {
                        next(new Error("To update email you must alse send verification code wich sended on your new email"));
                        return;
                    }
                    const newVerificationCode = await _entities_1.VerificationCode.fromEmail(email);
                    if (newVerificationCode instanceof Error) {
                        next(newVerificationCode);
                        return;
                    }
                    if (!(await newVerificationCode.compare(code))) {
                        next(new Error("Invalid new verification code"));
                        return;
                    }
                }
            }
            const edit = await user.edit({ username, passwordHash: newPassword ? await _primitives_1.Hash.hashPassword(newPassword) : undefined, email: email });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    getAvatars = images_1.default.get(_enums_1.ImageCategories.Users, true);
    getIsAvatarExists = images_1.default.getIsExists(_enums_1.ImageCategories.Users);
    setIdParam = (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
        req.params.id = req.body.accessTokenPayload.sub;
        next();
    });
    checkPermissions = (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
        if (req.body.accessTokenPayload.sub != req.body.id) {
            next(new Error("Forbidden", { cause: 403 }));
            return;
        }
        next();
    });
    postAvatars = [
        images_1.default.upload.single("image"),
        _middlewares_1.checkAuthorized,
        this.checkPermissions,
        ...images_1.default.postCreate(_enums_1.ImageCategories.Users, true, false)
    ];
    deleteAvatars = [
        _middlewares_1.checkAuthorized,
        this.setIdParam,
        ...images_1.default.delete(_enums_1.ImageCategories.Users, true)
    ];
    putAvatars = [
        images_1.default.upload.single("image"),
        _middlewares_1.checkAuthorized,
        this.checkPermissions,
        ...images_1.default.put(_enums_1.ImageCategories.Users, true, false)
    ];
}
exports.default = new Users();
