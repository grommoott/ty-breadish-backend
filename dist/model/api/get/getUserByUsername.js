"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserByUsername;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getUserByUsername(username, check = false) {
    try {
        const response = await bdClient_1.default.query(`select * from users where username='${username}'`);
        const user = response.rows[0];
        if (!user) {
            if (check) {
                return null;
            }
            return new Error(`User with such username(${username}) isn't found`, { cause: 400 });
        }
        return {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        };
    }
    catch (e) {
        const msg = "Error in getUserByUsername request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
