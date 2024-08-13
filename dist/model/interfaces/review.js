"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToReview = queryRowToReview;
const _primitives_1 = require("@primitives");
function queryRowToReview(row) {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "content" in row &&
        "rate" in row &&
        "moment" in row)) {
        throw new Error("Invalid query row to convert into IReview");
    }
    return {
        id: new _primitives_1.ReviewId(row.id),
        from: new _primitives_1.UserId(row.from),
        target: new _primitives_1.ItemId(row.target),
        content: row.content,
        rate: row.rate,
        moment: new _primitives_1.Moment(row.moment)
    };
}
