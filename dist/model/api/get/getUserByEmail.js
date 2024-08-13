"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserByEmail;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getUserByEmail(email) {
    try {
        const response = await bdClient_1.default.query(`select * from users where email='${email}'`);
        const user = response.rows[0];
        if (!user) {
            return new Error(`User with such email(${email}) isn't found`, { cause: 400 });
        }
        return (0, _interfaces_1.queryRowToUser)(user);
    }
    catch (e) {
        const msg = "Error in getUserByEmail request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
