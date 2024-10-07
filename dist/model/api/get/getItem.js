"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getItem;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getItem(id) {
    try {
        const productWithId = await bdClient_1.default.query(`select * from products where item_id=${id}`);
        if (productWithId.rowCount == 1) {
            return (0, _interfaces_1.queryRowToProduct)(productWithId.rows[0]);
        }
        const recipeWithId = await bdClient_1.default.query(`select * from recipes where item_id=${id}`);
        if (recipeWithId.rowCount == 1) {
            return (0, _interfaces_1.queryRowToRecipe)(recipeWithId.rows[0]);
        }
        return new Error(`Item with such itemId(${id}) isn't exists`);
    }
    catch (e) {
        const msg = "Error in getItem request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
