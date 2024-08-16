"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToVerificationCode = queryRowToVerificationCode;
const _primitives_1 = require("@primitives");
function queryRowToVerificationCode(row) {
    if (!("email" in row &&
        "code" in row &&
        "moment" in row)) {
        throw new Error("Invalid query row to convert into IVerificationCode");
    }
    return {
        email: row.email,
        code: row.code,
        moment: new _primitives_1.Moment(row.moment)
    };
}
