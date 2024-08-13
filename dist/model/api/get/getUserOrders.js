"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserOrders;
const _interfaces_1 = require("@interfaces");
const getUser_1 = __importDefault(require("./getUser"));
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getUserOrders(userId) {
    try {
        const userWithId = await (0, getUser_1.default)(userId);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const orders = await bdClient_1.default.query(`select * from orders where "from"=${userId}`);
        const resultPromises = orders.rows.map(async (orderRow) => {
            const productIds = await bdClient_1.default.query(`select * from order_products_ids where order=${orderRow.id}`);
            return (0, _interfaces_1.queryRowsToOrder)(orderRow, productIds.rows);
        });
        await Promise.all(resultPromises);
        const result = new Array();
        resultPromises.forEach(orderPromise => orderPromise.then(order => result.push(order)));
        await Promise.resolve();
        return result;
    }
    catch (e) {
        const msg = "Error in getUserOrders request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
