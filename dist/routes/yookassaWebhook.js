"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class YookassaWebhook {
    post = [
        (req, res, next) => {
            console.log(req.body);
            res.sendStatus(200);
            next();
        }
    ];
}
exports.default = new YookassaWebhook();
