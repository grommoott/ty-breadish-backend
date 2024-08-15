"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
class Products {
    getList = [
        _middlewares_1.checkAdmin,
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (_, res, next) => {
            const products = await _entities_1.Product.getProducts();
            res.send(products.map(product => {
                return {
                    id: product.id.id,
                    price: product.price.price,
                    itemId: product.itemId.id,
                    name: product.name,
                    avgRate: product.avgRate.avgRate,
                    itemInfo: product.itemInfo
                };
            }));
            next();
        })
    ];
}
exports.default = new Products();
