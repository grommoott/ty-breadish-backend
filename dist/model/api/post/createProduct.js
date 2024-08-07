"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createProduct;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createProduct(name, description, price, itemInfo) {
    try {
        const response = await bdClient_1.default.query(`insert into products values (default, nextval('item_id'), '${name}', '${description}' ${price}, -1, '${itemInfo.toJSON()}') returning *`);
        const product = response.rows[0];
        return {
            id: new _primitives_1.ProductId(product.id),
            itemId: new _primitives_1.ItemId(product.item_id),
            name: product.name,
            description: product.description,
            price: new _primitives_1.Price(product.price),
            avgRate: new _primitives_1.AvgRate(product.avg_rate),
            itemInfo: _primitives_1.ItemInfo.fromJSON(product.item_info)
        };
    }
    catch (e) {
        const msg = "Error in createProduct request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
