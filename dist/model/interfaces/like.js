"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToLike = queryRowToLike;
const _primitives_1 = require("@primitives");
function queryRowToLike(row) {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "type" in row)) {
        throw new Error("Invalid query row to convert into ILike");
    }
    return {
        id: new _primitives_1.LikeId(row.id),
        from: new _primitives_1.UserId(row.from),
        target: new _primitives_1.Id(row.target),
        type: row.type
    };
}
