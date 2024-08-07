"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserByUsername;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function getUserByUsername(username) {
    try {
        const response = await bdClient_1.default.query(`select * from users where username='${username}'`);
        const user = response.rows[0];
        if (!user) {
            return new Error(`User with such username(${username}) isn't found`);
        }
        return {
            id: new _primitives_1.UserId(user.id),
            username: user.username,
            passwordHash: new _primitives_1.Hash(user.password_hash),
            email: new _primitives_1.Email(user.email),
            moment: new _primitives_1.Moment(user.moment)
        };
    }
    catch (e) {
        const msg = "Error in getUserByUsername request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
