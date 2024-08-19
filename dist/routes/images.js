"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _middlewares_1 = require("@middlewares");
class Images {
    get = (category) => {
        return [
            _middlewares_1.checkParams
        ];
    };
}
exports.default = new Images();
