"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItemIsRecipe = isItemIsRecipe;
exports.queryRowToRecipe = queryRowToRecipe;
const _primitives_1 = require("@primitives");
function isItemIsRecipe(item) {
    return item?.id instanceof _primitives_1.RecipeId;
}
function queryRowToRecipe(row) {
    if (!("id" in row &&
        "item_id" in row &&
        "name" in row &&
        "description" in row &&
        "avg_rate" in row &&
        "item_info" in row)) {
        throw new Error("Invalid query row to convert into IRecipe");
    }
    return {
        id: new _primitives_1.RecipeId(row.id),
        itemId: new _primitives_1.ItemId(row.item_id),
        name: row.name,
        description: row.description,
        avgRate: new _primitives_1.AvgRate(row.avg_rate),
        itemInfo: _primitives_1.ItemInfo.fromJSON(row.item_info)
    };
}
