"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getUser(userId) {
    try {
        console.log("Starting query");
        const response = await bdClient_1.default.query(`select * from users where id='${userId}'`);
        const user = response.rows[0];
        if (!user) {
            return null;
        }
        const result = {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        };
        return result;
    }
    catch (e) {
        console.error("Error in getUser request:", e);
        return null;
    }
}
