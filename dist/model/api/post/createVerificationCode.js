"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createVerificationCode;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getVerificationCode_1 = __importDefault(require("@api/get/getVerificationCode"));
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createVerificationCode(username, code, moment) {
    try {
        const _moment = (() => {
            if (moment) {
                return moment;
            }
            else {
                return _primitives_1.Moment.now();
            }
        })();
        const verificationCode = await (0, getVerificationCode_1.default)(username);
        if (!(verificationCode instanceof Error)) {
            return new Error(`There is already verification code for user ${username}`);
        }
        const response = await bdClient_1.default.query(`insert into verification_codes values ('${(0, _helpers_1.pgFormat)(username)}', ${code}, ${_moment}) returning *`);
        return (0, _interfaces_1.queryRowToVerificationCode)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createVerificationCode request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
