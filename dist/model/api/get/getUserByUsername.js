"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserByUsername;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getUserByUsername(username) {
    try {
        const response = await bdClient_1.default.query(`select * from users where username='${username}'`);
        const user = response.rows[0];
        if (!user) {
            return new Error(`User with such username(${username}) isn't found`);
        }
        return (0, _interfaces_1.queryRowToUser)(user);
    }
    catch (e) {
        const msg = "Error in getUserByUsername request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
