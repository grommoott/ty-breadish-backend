"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOrdersByBakeryId;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getOrdersByBakeryId(id) {
    try {
        const orders = await bdClient_1.default.query(`select * from orders where order_info -> 'bakeryId'='${id}'`);
        const resultPromises = orders.rows.map(async (orderRow) => {
            const result = await bdClient_1.default.query(`select * from order_products_ids where "order"=${orderRow.id}`);
            return (0, _interfaces_1.queryRowsToOrder)(orderRow, result.rows);
        });
        await Promise.all(resultPromises);
        const result = new Array();
        resultPromises.forEach((promise) => promise.then((order) => {
            result.push(order);
        }));
        await Promise.resolve();
        return result;
    }
    catch (e) {
        const msg = "Error in getOrdersByBakeryId request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
