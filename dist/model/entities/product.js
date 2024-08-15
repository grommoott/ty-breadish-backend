"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const item_1 = require("./item");
const _interfaces_1 = require("@interfaces");
const updateProduct_1 = __importDefault(require("@api/put/updateProduct"));
const deleteProduct_1 = __importDefault(require("@api/delete/deleteProduct"));
const getProducts_1 = __importDefault(require("@api/get/getProducts"));
const getProduct_1 = __importDefault(require("@api/get/getProduct"));
const getItem_1 = __importDefault(require("@api/get/getItem"));
const createProduct_1 = __importDefault(require("@api/post/createProduct"));
class Product extends item_1.Item {
    // Private fields
    _id;
    _price;
    static _products;
    // Getters
    get id() {
        return this._id;
    }
    get price() {
        return this._price;
    }
    // Methods
    async edit(data) {
        return await (0, updateProduct_1.default)(this._id, data);
    }
    async delete() {
        return await (0, deleteProduct_1.default)(this._id);
    }
    // Static constructors
    static async fromId(id) {
        const product = await (0, getProduct_1.default)(id);
        if (product instanceof Error) {
            return product;
        }
        return new Product(product);
    }
    static async fromItemId(id) {
        const item = await (0, getItem_1.default)(id);
        if (item instanceof Error) {
            return item;
        }
        if ((0, _interfaces_1.isItemIsRecipe)(item)) {
            return new Error(`Item with this id(${id}) actually is a recipe, but not a product`);
        }
        return new Product(item);
    }
    static async getProducts() {
        if (!this._products) {
            const products = await (0, getProducts_1.default)();
            this._products = products.map(product => new Product(product));
        }
        return this._products;
    }
    static async create(price, name, description, itemInfo) {
        const product = await (0, createProduct_1.default)(name, description, price, itemInfo);
        if (product instanceof Error) {
            return product;
        }
        return new Product(product);
    }
    toNormalView() {
        return {
            id: this.id.id,
            price: this.price.price,
            itemId: this.itemId.id,
            name: this.name,
            description: this.description,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo
        };
    }
    constructor({ id, price, itemId, name, description, avgRate, itemInfo }) {
        super({ itemId, name, description, avgRate, itemInfo });
        this._id = id;
        this._price = price;
    }
}
exports.Product = Product;
