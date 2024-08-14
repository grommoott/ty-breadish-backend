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
const _primitives_1 = require("@primitives");
class Register {
    post = [
        (0, _middlewares_1.checkBodyParams)(["username", "password", "email"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const user = await _entities_1.User.create(req.body.username, await _primitives_1.Hash.hashPassword(req.body.password), new _primitives_1.Email(req.body.email));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const deviceId = req.cookies?.DeviceId;
            const session = await jwt_1.default.createSession(user, deviceId);
            if (session instanceof Error) {
                next(session);
                return;
            }
            const refreshToken = await jwt_1.default.createRefreshTokenFromSession(session);
            if (refreshToken instanceof Error) {
                next(session);
                return;
            }
            const accessToken = jwt_1.default.createAccessToken(user);
            res.cookie("RefreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: "strict", expires: new Date(new Date().getTime() + 3 * timeConstants_1.month) });
            res.cookie("AccessToken", accessToken, { secure: true, httpOnly: true, sameSite: "strict", expires: new Date(new Date().getTime() + 20 * timeConstants_1.minute) });
            res.cookie("DeviceId", session.deviceId);
            res.send(user.serialize());
        })
    ];
}
exports.default = new Register();
