"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _primitives_1 = require("@primitives");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _entities_1 = require("@entities");
const uuid_1 = require("uuid");
const week = 7 * 24 * 3600;
class Jwt {
    _secret;
    createAccessToken(userId, lifetime = 1800) {
        const date = Math.floor(new Date().getTime() / 1000);
        return jsonwebtoken_1.default.sign({
            sub: userId.id,
            iat: date,
            exp: date + lifetime
        }, this._secret);
    }
    async createRefreshTokenFromSession(session, lifetime = 2 * week) {
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
    async createRefreshToken(userId, deviceId, lifetime = 2 * week) {
        const session = await _entities_1.Session.fromUserDevice(userId, deviceId);
        if (session instanceof Error) {
            return session;
        }
        return this.createRefreshTokenFromSession(session);
    }
    async createSession(userId) {
        const refreshTokenId = (0, uuid_1.v4)();
        const deviceId = (0, uuid_1.v4)();
        const session = await _entities_1.Session.create(userId, refreshTokenId, deviceId);
        return session;
    }
    constructor() {
        this._secret = "test"; //process.env.PRIVATE_KEY as string
    }
}
exports.default = new Jwt();
