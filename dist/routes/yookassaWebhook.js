"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _middlewares_1 = require("@middlewares");
class YookassaWebhook {
    post = [
        _middlewares_1.checkYookassa,
        (req, res, next) => {
            console.log(req.body);
            next();
        }
    ];
}
exports.default = new YookassaWebhook();
