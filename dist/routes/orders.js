"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const yookassa_1 = require("@helpers/yookassa");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const config_1 = require("./config");
class Orders {
    get = [
        _middlewares_1.checkAuthorized,
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const orders = await user.getOrders();
            if (orders instanceof Error) {
                next(orders);
                return;
            }
            res.send(orders.map(order => order.toNormalView()));
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["orderType", "orderInfo", "productIds"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const orderType = req.body.orderType;
            const orderInfo = req.body.orderInfo;
            const productIds = req.body.productIds.map((productId) => new _primitives_1.ProductId(productId));
            if (!(0, _helpers_1.isInEnum)(_enums_1.OrderTypes, orderType)) {
                next(new Error("Invalid request!", { cause: 400 }));
                return;
            }
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const productPromises = productIds.map(async (productId) => {
                return await _entities_1.Product.fromId(productId);
            });
            await Promise.all(productPromises);
            let error = new Object();
            let prices = new Array();
            let names = new Array();
            productPromises.forEach(productPromise => productPromise.then(product => {
                if (product instanceof Error) {
                    error = product;
                }
                else {
                    if (error instanceof Error) {
                        return error;
                    }
                    const count = orderInfo.productCounts[product.id.id];
                    if (count > 0) {
                        prices.push(product.price.price * count);
                        names.push(product.name);
                    }
                }
            }));
            await Promise.resolve();
            if (error instanceof Error) {
                next(error);
                return;
            }
            const price = new _primitives_1.Price(prices.reduce((acc, cur) => acc + cur));
            const description = (() => {
                let builder = "";
                for (const name of names) {
                    const tmp = builder + name;
                    if (tmp.length > config_1.maxPaymentDescriptionSize - 7) {
                        builder += " и т.д.";
                        break;
                    }
                    else if (tmp.length > config_1.maxPaymentDescriptionSize - 7) {
                        builder = tmp;
                        break;
                    }
                    builder = tmp;
                }
                return builder;
            })();
            const payment = await yookassa_1.yookassaApi.createPayment(price, description, "https://example.com");
            if (payment instanceof Error) {
                next(payment);
                return;
            }
            const order = await user.createOrder(payment.id, orderType, orderInfo, productIds);
            if (order instanceof Error) {
                next(order);
                return;
            }
            res.send(order.toNormalView());
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const id = new _primitives_1.OrderId(req.params.id);
            const order = await _entities_1.Order.fromId(id);
            if (order instanceof Error) {
                next(order);
                return;
            }
            if (from.id !== order.from.id) {
                next(new Error("Forbidden!", { cause: 403 }));
                return;
            }
            const refund = await yookassa_1.yookassaApi.refundPayment(await order.getPrice(), order.paymentId);
            if (refund instanceof Error) {
                next(refund);
                return;
            }
            if (!refund) {
                next(new Error("Error! Try again later, sorry for the inconvinience", { cause: 500 }));
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new Orders();
