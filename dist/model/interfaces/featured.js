"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToFeatured = queryRowToFeatured;
const _primitives_1 = require("@primitives");
function queryRowToFeatured(row) {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "item_type" in row)) {
        throw new Error("Invalid query row to convert into IFeatured");
    }
    return {
        id: new _primitives_1.FeaturedId(row.id),
        from: new _primitives_1.UserId(row.from),
        target: new _primitives_1.ItemId(row.target),
        itemType: row.item_type
    };
}
