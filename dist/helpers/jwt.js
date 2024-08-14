"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _primitives_1 = require("@primitives");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _entities_1 = require("@entities");
const uuid_1 = require("uuid");
const timeConstants_1 = require("./timeConstants");
class Jwt {
    _secret;
    createAccessToken(user, lifetime = 1800) {
        const date = Math.floor(new Date().getTime() / 1000);
        return jsonwebtoken_1.default.sign({
            sub: user.id.id,
            iat: date,
            exp: date + lifetime
        }, this._secret);
    }
    async createRefreshTokenFromSession(session, lifetime = 2 * timeConstants_1.weekSeconds) {
        const date = Math.floor(new Date().getTime() / 1000);
        const refreshTokenId = (0, uuid_1.v4)();
        await session.edit({ refreshTokenId, moment: new _primitives_1.Moment(date * 1000) });
        return jsonwebtoken_1.default.sign({
            sub: session.userId.id,
            iat: date,
            exp: date + lifetime,
            jti: refreshTokenId,
            dvi: session.deviceId
        }, this._secret);
    }
    async createRefreshToken(user, deviceId, lifetime = 2 * timeConstants_1.weekSeconds) {
        const session = await _entities_1.Session.fromUserDevice(user.id, deviceId);
        if (session instanceof Error) {
            return session;
        }
        return this.createRefreshTokenFromSession(session, lifetime);
    }
    async createSession(user, deviceId) {
        const refreshTokenId = (0, uuid_1.v4)();
        const _deviceId = deviceId || (0, uuid_1.v4)();
        const session = await _entities_1.Session.create(user.id, refreshTokenId, _deviceId);
        return session;
    }
    getAccessTokenPayload(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this._secret);
            const sub = (() => {
                switch (typeof payload.sub) {
                    case "number":
                        return payload.sub;
                    case "string":
                        return parseInt(payload.sub);
                    default:
                        throw new Error("Invalid sub");
                }
            })();
            return {
                sub: sub,
                iat: payload.iat || (() => { throw new Error("Invalid iat"); })(),
                exp: payload.exp || (() => { throw new Error("Invalid exp"); })(),
            };
        }
        catch (e) {
            const msg = "Failed to get payload: " + e;
            return new Error(msg);
        }
    }
    getRefreshTokenPayload(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this._secret);
            const sub = (() => {
                switch (typeof payload.sub) {
                    case "number":
                        return payload.sub;
                    case "string":
                        return parseInt(payload.sub);
                    default:
                        throw new Error("Invalid sub");
                }
            })();
            return {
                sub: sub,
                iat: payload.iat || (() => { throw new Error("Invalid iat"); })(),
                exp: payload.exp || (() => { throw new Error("Invalid exp"); })(),
                jti: payload.jti || (() => { throw new Error("Invalid jti"); })(),
                dvi: payload.dvi || (() => { throw new Error("Invalid dvi"); })()
            };
        }
        catch (e) {
            const msg = "Failed to get payload: " + e;
            return new Error(msg);
        }
    }
    constructor() {
        this._secret = "test"; //process.env.PRIVATE_KEY as string
    }
}
exports.default = new Jwt();
