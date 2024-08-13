"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToUser = queryRowToUser;
const _primitives_1 = require("@primitives");
function queryRowToUser(row) {
    if (!("id" in row && "username" in row && "password_hash" in row && "email" in row && "moment" in row)) {
        throw new Error("Invalid query row to convert into IUser");
    }
    return {
        id: new _primitives_1.UserId(row.id),
        username: row.username,
        passwordHash: new _primitives_1.Hash(row.password_hash),
        email: new _primitives_1.Email(row.email),
        moment: new _primitives_1.Moment(row.moment)
    };
}
