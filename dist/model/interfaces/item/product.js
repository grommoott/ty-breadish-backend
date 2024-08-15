"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItemIsProduct = isItemIsProduct;
exports.queryRowToProduct = queryRowToProduct;
const _primitives_1 = require("@primitives");
function isItemIsProduct(item) {
    return item?.id instanceof _primitives_1.ProductId &&
        item?.id instanceof _primitives_1.Price;
}
function queryRowToProduct(row) {
    if (!("id" in row &&
        "price" in row &&
        "item_id" in row &&
        "name" in row &&
        "description" in row &&
        "avg_rate" in row &&
        "item_info" in row)) {
        throw new Error("Invalid query row to convert into IProduct");
    }
    return {
        id: new _primitives_1.ProductId(row.id),
        price: new _primitives_1.Price(row.price),
        itemId: new _primitives_1.ItemId(row.item_id),
        name: row.name,
        description: row.description,
        avgRate: new _primitives_1.AvgRate(row.avg_rate),
        itemInfo: _primitives_1.ItemInfo.fromObject(row.item_info)
    };
}
