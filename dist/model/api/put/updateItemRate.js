"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateItemRate;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getItem_1 = __importDefault(require("@api/get/getItem"));
const _interfaces_1 = require("@interfaces");
async function updateItemRate(itemId) {
    try {
        const item = await (0, getItem_1.default)(itemId);
        if (item instanceof Error) {
            return item;
        }
        if ((0, _interfaces_1.isItemIsRecipe)(item)) {
            await bdClient_1.default.query(`update recipies set avg_rate=(select avg(cast(cast(rate as text) as integer)) from reviews where target=${itemId}) where item_id=${itemId}`);
            return;
        }
        if ((0, _interfaces_1.isItemIsProduct)(item)) {
            await bdClient_1.default.query(`update products set avg_rate=(select avg(cast(cast(rate as text) as integer)) from reviews where target=${itemId}) where item_id=${itemId}`);
            return;
        }
        return new Error(`Item with such itemId(${itemId}) isn't exists`);
    }
    catch (e) {
        const msg = "Error in updateItemRate request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
