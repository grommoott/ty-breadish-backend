"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateVerificationCode;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getVerificationCode_1 = __importDefault(require("@api/get/getVerificationCode"));
const _helpers_1 = require("@helpers");
async function updateVerificationCode(username, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const verificationCode = await (0, getVerificationCode_1.default)(username);
        if (verificationCode instanceof Error) {
            return verificationCode;
        }
        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${val}`;
        }).join(", ");
        await bdClient_1.default.query(`update verification_codes set ${setString} where "user"='${(0, _helpers_1.pgFormat)(username)}'`);
    }
    catch (e) {
        const msg = "Error in updateVerificationCode request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
