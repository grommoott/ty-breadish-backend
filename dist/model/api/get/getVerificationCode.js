"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getVerificationCode;
const _interfaces_1 = require("@interfaces");
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _helpers_1 = require("@helpers");
async function getVerificationCode(email) {
    try {
        const response = await bdClient_1.default.query(`select * from verification_codes where email='${(0, _helpers_1.pgFormat)(email)}'`);
        if (response.rowCount == 0) {
            return new Error(`There is no verification code for user ${email}`);
        }
        return (0, _interfaces_1.queryRowToVerificationCode)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in getVerificationCode request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
