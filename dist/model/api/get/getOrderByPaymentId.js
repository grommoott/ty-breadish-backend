"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOrderByPaymentId;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getOrderByPaymentId(paymentId) {
    try {
        const orders = await bdClient_1.default.query(`select * from orders where payment_id='${paymentId}'`);
        if (orders.rowCount == 0) {
            return new Error(`Order with such payment id(${paymentId}) isn't found`);
        }
        const order = orders.rows[0];
        const products = await bdClient_1.default.query(`select * from order_products_ids where "order"=${order.id}`);
        return (0, _interfaces_1.queryRowsToOrder)(order, products.rows);
    }
    catch (e) {
        const msg = "Error in getOrderByPaymentId request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
