"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getProducts;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getProducts() {
    try {
        const response = await bdClient_1.default.query("select * from products");
        return response.rows.map(product => {
            return {
                id: product.id,
                itemId: product.item_id,
                name: product.name,
                price: product.price,
                avgRate: product.avg_rate
            };
        });
    }
    catch (e) {
        const msg = "Error in getProducts request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
