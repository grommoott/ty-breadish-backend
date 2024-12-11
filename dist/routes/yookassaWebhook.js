"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const yookassa_1 = require("@helpers/yookassa");
const _middlewares_1 = require("@middlewares");
class YookassaWebhook {
    post = [
        _middlewares_1.checkYookassa,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const paymentId = req.body.object.id;
            let set = new Object();
            switch (req.body.event) {
                case yookassa_1.YookassaEvents.PaymentSucceeded:
                    set = await this.setPaymentStatus(paymentId, _enums_1.PaymentStatuses.Succeeded);
                case yookassa_1.YookassaEvents.PaymentCanceled:
                    set = await this.setPaymentStatus(paymentId, _enums_1.PaymentStatuses.Canceled);
                case yookassa_1.YookassaEvents.RefundSucceeded:
                    set = await this.setPaymentStatus(paymentId, _enums_1.PaymentStatuses.Refunded);
            }
            if (set instanceof Error) {
                res.sendStatus(500);
            }
            res.sendStatus(200);
            next();
        })
    ];
    async setPaymentStatus(paymentId, paymentStatus) {
        const order = await _entities_1.Order.fromPaymentId(paymentId);
        console.log("paymentStatus " + paymentStatus);
        if (order instanceof Error) {
            return order;
        }
        const edit = await order.edit({ paymentStatus });
        if (edit instanceof Error) {
            return edit;
        }
    }
}
exports.default = new YookassaWebhook();
