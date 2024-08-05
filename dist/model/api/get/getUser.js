"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getUser(userId, check = false) {
    try {
        const response = await bdClient_1.default.query(`select * from users where id='${userId}'`);
        const user = response.rows[0];
        if (!user) {
            if (check) {
                return null;
            }
            return new Error(`User with such userId(${userId}) isn't found`, { cause: 400 });
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
        const msg = "Error in getUser request:" + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
