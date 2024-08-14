"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createSession;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getSessionByUserDevice_1 = __importDefault(require("@api/get/getSessionByUserDevice"));
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createSession(userId, refreshTokenId, deviceId, moment = null) {
    try {
        const sessionWithUserDevice = await (0, getSessionByUserDevice_1.default)(userId, deviceId);
        if (!(sessionWithUserDevice instanceof Error)) {
            return new Error(`There is already session with userId ${userId} and deviceId ${deviceId}`);
        }
        const _moment = (() => {
            if (moment === null) {
                return _primitives_1.Moment.now();
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into sessions values (default, ${userId}, '${refreshTokenId}', '${deviceId}', ${_moment}) returning * `);
        return (0, _interfaces_1.queryRowToSession)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createSession request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
