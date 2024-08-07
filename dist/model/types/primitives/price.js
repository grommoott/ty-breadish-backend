"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
class Price {
    _price;
    get price() {
        return this._price;
    }
    toString() {
        return `${this._price.toString()} ₽`;
    }
    toBDView() {
        return this._price.toString();
    }
    constructor(price) {
        this._price = price;
    }
}
exports.Price = Price;
