"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const deleteOrder_1 = __importDefault(require("@api/delete/deleteOrder"));
const getOrder_1 = __importDefault(require("@api/get/getOrder"));
const createOrder_1 = __importDefault(require("@api/post/createOrder"));
const updateOrder_1 = __importDefault(require("@api/put/updateOrder"));
const _primitives_1 = require("@primitives");
const entity_1 = require("./entity");
const getUserOrders_1 = __importDefault(require("@api/get/getUserOrders"));
const getOrderByPaymentId_1 = __importDefault(require("@api/get/getOrderByPaymentId"));
const product_1 = require("./product");
const getOrdersByBakeryId_1 = __importDefault(require("@api/get/getOrdersByBakeryId"));
class Order extends entity_1.Entity {
    // Private fields
    _order;
    _products;
    _price;
    // Getters
    get id() {
        return this._order.id;
    }
    get from() {
        return this._order.from;
    }
    get paymentId() {
        return this._order.paymentId;
    }
    get paymentStatus() {
        return this._order.paymentStatus;
    }
    get moment() {
        return this._order.moment;
    }
    get orderType() {
        return this._order.orderType;
    }
    get orderInfo() {
        return this._order.orderInfo;
    }
    get productIds() {
        return this._order.productIds;
    }
    // Methods
    async getProducts() {
        if (!this._products) {
            this._products = new Array();
            const productPromises = this._order.productIds.map(async (productId) => await product_1.Product.fromId(productId));
            await Promise.all(productPromises);
            productPromises.forEach(productPromise => productPromise.then(product => {
                if (product instanceof Error) {
                    return;
                }
                this._products?.push(product);
            }));
            await Promise.resolve();
        }
        return this._products;
    }
    async getPrice() {
        if (!this._price) {
            const products = await this.getProducts();
            this._price = new _primitives_1.Price(products
                .map(product => product.price.price * this.orderInfo.productCounts[product.id.id]).reduce((acc, cur) => acc + cur));
        }
        return this._price;
    }
    async edit(data) {
        return await (0, updateOrder_1.default)(this._order.id, data);
    }
    async delete() {
        return await (0, deleteOrder_1.default)(this._order.id);
    }
    // Static constructors
    static async fromId(id) {
        const order = await (0, getOrder_1.default)(id);
        if (order instanceof Error) {
            return order;
        }
        return new Order(order);
    }
    static async fromPaymentId(paymentId) {
        const order = await (0, getOrderByPaymentId_1.default)(paymentId);
        if (order instanceof Error) {
            return order;
        }
        return new Order(order);
    }
    static async fromBakeryId(id) {
        const response = await (0, getOrdersByBakeryId_1.default)(id);
        if (response instanceof Error) {
            return response;
        }
        return response.map(order => new Order(order));
    }
    static async fromUser(id) {
        const orders = await (0, getUserOrders_1.default)(id);
        if (orders instanceof Error) {
            return orders;
        }
        return orders.map(order => new Order(order));
    }
    static async create({ from, paymentId, orderType, orderInfo, productIds }) {
        const order = await (0, createOrder_1.default)(from, paymentId, orderType, orderInfo, productIds);
        if (order instanceof Error) {
            return order;
        }
        return new Order(order);
    }
    toNormalView() {
        return {
            id: this._order.id.id,
            from: this._order.from.id,
            moment: this._order.moment.moment,
            orderType: this._order.orderType,
            orderInfo: this._order.orderInfo,
            productIds: this._order.productIds.map(productId => productId.id),
            readyMoment: this._order.readyMoment.moment,
            paymentId: this._order.paymentId,
            paymentStatus: this._order.paymentStatus
        };
    }
    constructor({ id, from, paymentId, paymentStatus, moment, orderType, orderInfo, productIds, readyMoment }) {
        super();
        this._order = { id, from, paymentId, paymentStatus, moment, orderType, orderInfo, productIds, readyMoment };
    }
}
exports.Order = Order;
