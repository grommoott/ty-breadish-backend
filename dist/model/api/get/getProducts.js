"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getProducts;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function getProducts() {
    try {
        const response = await bdClient_1.default.query("select * from products");
        return response.rows.map(product => {
            return {
                id: new _primitives_1.ProductId(product.id),
                itemId: new _primitives_1.ItemId(product.item_id),
                name: product.name,
                price: new _primitives_1.Price(product.price),
                avgRate: new _primitives_1.AvgRate(product.avg_rate)
            };
        });
    }
    catch (e) {
        const msg = "Error in getProducts request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
