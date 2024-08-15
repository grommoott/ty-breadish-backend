"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOrder;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getOrder(id) {
    try {
        const response = await bdClient_1.default.query(`select * from orders where id=${id}`);
        if (response.rowCount == 0) {
            return new Error(`Order with such id(${id}) isn't exists`);
        }
        const order = response.rows[0];
        const products = await bdClient_1.default.query(`select * from order_products_ids where order=${order}`);
        return (0, _interfaces_1.queryRowsToOrder)(order, products.rows);
    }
    catch (e) {
        const msg = "Error in getOrder request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
