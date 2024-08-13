"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const deleteSession_1 = require("@api/delete/deleteSession");
const getSession_1 = require("@api/get/getSession");
const getSessionByUserDevice_1 = __importDefault(require("@api/get/getSessionByUserDevice"));
const createSession_1 = __importDefault(require("@api/post/createSession"));
const updateSession_1 = __importDefault(require("@api/put/updateSession"));
class Session {
    // Private fields
    _session;
    // Getters
    get id() {
        return this._session.id;
    }
    get userId() {
        return this._session.userId;
    }
    get refreshTokenId() {
        return this._session.refreshTokenId;
    }
    get deviceId() {
        return this._session.deviceId;
    }
    get moment() {
        return this._session.moment;
    }
    // Methods
    async edit(data) {
        return await (0, updateSession_1.default)(this._session.id, data);
    }
    async delete() {
        return await (0, deleteSession_1.deleteSession)(this._session.id);
    }
    // Static constructors
    static async fromId(id) {
        const session = await (0, getSession_1.getSession)(id);
        if (session instanceof Error) {
            return session;
        }
        return new Session(session);
    }
    static async fromUserDevice(userId, deviceId) {
        const session = await (0, getSessionByUserDevice_1.default)(userId, deviceId);
        if (session instanceof Error) {
            return session;
        }
        return new Session(session);
    }
    static async create(userId, refreshTokenId, deviceId) {
        const session = await (0, createSession_1.default)(userId, refreshTokenId, deviceId);
        if (session instanceof Error) {
            return session;
        }
        return new Session(session);
    }
    constructor({ id, userId, refreshTokenId, deviceId, moment }) {
        this._session = { id, userId, refreshTokenId, deviceId, moment };
    }
}
exports.Session = Session;
