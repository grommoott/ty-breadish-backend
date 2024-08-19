"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createOrder;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getOrderByPaymentId_1 = __importDefault(require("@api/get/getOrderByPaymentId"));
const getProduct_1 = __importDefault(require("@api/get/getProduct"));
const getUser_1 = __importDefault(require("@api/get/getUser"));
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createOrder(from, paymentId, orderType, orderInfo, productIds, moment) {
    try {
        const userWithId = await (0, getUser_1.default)(from);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const orderWithPaymentId = await (0, getOrderByPaymentId_1.default)(paymentId);
        if (!(orderWithPaymentId instanceof Error)) {
            return new Error(`Order with such payment id(${paymentId}) is already exists`);
        }
        if (productIds.length == 0) {
            return new Error(`Empty products list!`);
        }
        const _moment = (() => {
            if (!moment) {
                return _primitives_1.Moment.now();
            }
            else {
                return moment;
            }
        })();
        const productsWithIdPromises = productIds.map(async (productId) => {
            return await (0, getProduct_1.default)(productId);
        });
        await Promise.all(productsWithIdPromises);
        const productsWithId = new Array();
        productsWithIdPromises.forEach(productPromise => productPromise.then((product) => productsWithId.push(product)));
        await Promise.resolve();
        for (let product of productsWithId) {
            if (product instanceof Error) {
                return product;
            }
        }
        const responseOrders = await bdClient_1.default.query(`insert into orders values (default, ${from}, '${(0, _helpers_1.pgFormat)(paymentId)}', '${_enums_1.PaymentStatuses.NotSucceeded}', ${_moment}, '${(0, _helpers_1.pgFormat)(orderType)}', '${(0, _helpers_1.pgFormat)(JSON.stringify(orderInfo))}', -1) returning *`);
        const order = responseOrders.rows[0];
        const responseProducts = await bdClient_1.default.query(`insert into order_products_ids values ${productIds.map(productId => `(default, ${order.id}, ${productId})`).join(", ")} returning *`);
        return (0, _interfaces_1.queryRowsToOrder)(responseOrders.rows[0], responseProducts.rows);
    }
    catch (e) {
        const msg = "Error in createOrder request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
