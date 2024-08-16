"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const path_1 = __importDefault(require("path"));
class Products {
    getList = [
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (_, res, next) => {
            const products = await _entities_1.Product.getProducts();
            res.send(products.map(product => product.toListView()));
            next();
        })
    ];
    get = [
        (0, _middlewares_1.checkParams)(["id"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.ProductId(req.params.id);
            const product = await _entities_1.Product.fromId(id);
            if (product instanceof Error) {
                next(product);
                return;
            }
            res.send(product.toNormalView());
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["price", "name", "description", "itemInfo"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const price = req.body.price;
            const name = req.body.name;
            const description = req.body.description;
            const itemInfo = req.body.itemInfo;
            const product = await _entities_1.Product.create(price, name, description, itemInfo);
            if (product instanceof Error) {
                next(product);
                return;
            }
            res.send(product.toNormalView());
            next();
        })
    ];
    put = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.ProductId(req.body.id);
            const price = new _primitives_1.Price(req.body.price);
            const name = req.body.name;
            const description = req.body.description;
            const itemInfo = req.body.itemInfo;
            const product = await _entities_1.Product.fromId(id);
            if (product instanceof Error) {
                next(product);
                return;
            }
            const edit = await product.edit({ price, name, description, itemInfo });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
        })
    ];
    delete = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.ProductId(req.params.id);
            const product = await _entities_1.Product.fromId(id);
            if (product instanceof Error) {
                next(product);
                return;
            }
            const del = await product.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
        })
    ];
    getImages = [
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.ProductId(req.params.id);
            res.sendFile(path_1.default.join(__dirname, `../../data/images/produts/${id}.webp`));
            next();
        })
    ];
}
exports.default = new Products();
