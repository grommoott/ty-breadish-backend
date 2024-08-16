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
    async createAccessToken(user, lifetime = 1800) {
        const date = Math.floor(new Date().getTime() / 1000);
        const role = await user.getRole();
        if (role instanceof Error) {
            return role;
        }
        return jsonwebtoken_1.default.sign({
            sub: user.id.id,
            iat: date,
            exp: date + lifetime,
            role: role
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
        const session = await _entities_1.Session.fromUserDevice(user, deviceId);
        if (session instanceof Error) {
            return session;
        }
        return this.createRefreshTokenFromSession(session, lifetime);
    }
    createRegisterToken(username, password, email) {
        const payload = {
            username,
            password,
            email: email.email
        };
        return jsonwebtoken_1.default.sign(payload, this._secret);
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
                role: payload.role || (() => { throw new Error("Invalid role"); })
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
    getRegisterTokenPayload(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this._secret);
            return {
                username: payload.username || (() => { throw new Error("Invalid username"); })(),
                password: payload.password || (() => { throw new Error("Invalid password"); })(),
                email: payload.email || (() => { throw new Error("Invlid email"); })()
            };
        }
        catch (e) {
            const msg = "Failed to get payload: " + e;
            return new Error(msg);
        }
    }
    constructor() {
        this._secret = process.env.PRIVATE_KEY || "test";
    }
}
exports.default = new Jwt();
