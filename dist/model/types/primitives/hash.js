"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Hash {
    _hash;
    get hash() {
        return this._hash;
    }
    static async hashPassword(password) {
        return new Hash(await bcrypt_1.default.hash(password, 10));
    }
    async compare(password) {
        return bcrypt_1.default.compare(password, this._hash);
    }
    constructor(value) {
        this._hash = value;
    }
}
exports.Hash = Hash;
