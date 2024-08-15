"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCode = void 0;
const deleteVerificationCode_1 = __importDefault(require("@api/delete/deleteVerificationCode"));
const getVerificationCode_1 = __importDefault(require("@api/get/getVerificationCode"));
const createVerificationCode_1 = __importDefault(require("@api/post/createVerificationCode"));
const updateVerificationCode_1 = __importDefault(require("@api/put/updateVerificationCode"));
const timeConstants_1 = require("@helpers/timeConstants");
const _primitives_1 = require("@primitives");
class VerificationCode {
    // Private fields
    _verificationCode;
    static _maxAge = timeConstants_1.hour;
    // Getters
    get username() {
        return this._verificationCode.username;
    }
    get code() {
        return this._verificationCode.code;
    }
    get moment() {
        return this._verificationCode.moment;
    }
    get isFresh() {
        return _primitives_1.Moment.now().moment - this._verificationCode.moment.moment <= VerificationCode._maxAge;
    }
    // Methods
    async edit(data) {
        return await (0, updateVerificationCode_1.default)(this._verificationCode.username, data);
    }
    async delete() {
        return await (0, deleteVerificationCode_1.default)(this._verificationCode.username);
    }
    // Static constructors
    static async fromUsername(username) {
        const verificationCode = await (0, getVerificationCode_1.default)(username);
        if (verificationCode instanceof Error) {
            return verificationCode;
        }
        return new VerificationCode(verificationCode);
    }
    static async create(username) {
        const code = 100000 + Math.floor(900000 * Math.random());
        const verificationCode = await (0, createVerificationCode_1.default)(username, code);
        if (verificationCode instanceof Error) {
            return verificationCode;
        }
        return new VerificationCode(verificationCode);
    }
    constructor({ username, code, moment }) {
        this._verificationCode = { username, code, moment };
    }
}
exports.VerificationCode = VerificationCode;
