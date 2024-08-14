"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSessionByUserDevice;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getSessionByUserDevice(userId, deviceId) {
    try {
        const response = await bdClient_1.default.query(`select * from sessions where user_id=${userId} and device_id='${deviceId}'`);
        if (response.rowCount == 0) {
            return new Error(`Session with such userId(${userId}) and deviceId(${deviceId}) isn't found`);
        }
        return (0, _interfaces_1.queryRowToSession)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in getSessionByUserDevice request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
