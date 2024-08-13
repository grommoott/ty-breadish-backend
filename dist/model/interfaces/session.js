"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToSession = queryRowToSession;
const _primitives_1 = require("@primitives");
function queryRowToSession(row) {
    if (!("id" in row &&
        "user_id" in row &&
        "refresh_token_id" in row &&
        "device_id" in row &&
        "moment" in row)) {
        throw new Error("Invalid query row to convert into ISession");
    }
    return {
        id: new _primitives_1.SessionId(row.id),
        userId: new _primitives_1.UserId(row.user_id),
        refreshTokenId: row.refresh_token_id,
        deviceId: row.device_id,
        moment: new _primitives_1.Moment(row.moment)
    };
}
