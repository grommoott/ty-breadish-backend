"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const jwt_1 = __importDefault(require("@helpers/jwt"));
const timeConstants_1 = require("@helpers/timeConstants");
const _primitives_1 = require("@primitives");
class AccessTokens {
    get = [
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            if (!req.cookies.RefreshToken) {
                next(new Error("Unauthorized!", { cause: 401 }));
                return;
            }
            const payload = jwt_1.default.getRefreshTokenPayload(req.cookies.RefreshToken);
            if (payload instanceof Error) {
                next(payload);
                return;
            }
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(payload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const session = await _entities_1.Session.fromUserDevice(user, payload.dvi);
            if (session instanceof Error) {
                next(session);
                return;
            }
            const newRefreshToken = await jwt_1.default.createRefreshTokenFromSession(session);
            if (newRefreshToken instanceof Error) {
                next(newRefreshToken);
                return;
            }
            const newAccessToken = await jwt_1.default.createAccessToken(user);
            if (newAccessToken instanceof Error) {
                next(newAccessToken);
                return;
            }
            res.cookie("RefreshToken", newRefreshToken, { secure: true, httpOnly: true, sameSite: true, maxAge: 2 * timeConstants_1.month });
            res.cookie("AccessToken", newAccessToken, { secure: true, httpOnly: true, sameSite: true, maxAge: 20 * timeConstants_1.minute });
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new AccessTokens();
