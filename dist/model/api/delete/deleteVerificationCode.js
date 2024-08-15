"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteVerificationCode;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _helpers_1 = require("@helpers");
async function deleteVerificationCode(username) {
    try {
        const response = await bdClient_1.default.query(`delete from verification_codes where username='${(0, _helpers_1.pgFormat)(username)}'`);
        return response.rowCount != 0;
    }
    catch (e) {
        const msg = "Error in deleteVerificationCode request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
