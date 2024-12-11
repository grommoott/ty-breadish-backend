import { Order } from "@entities"
import { PaymentStatus, PaymentStatuses } from "@enums"
import { asyncErrorCatcher } from "@helpers"
import { YookassaEvents } from "@helpers/yookassa"
import { checkYookassa, Middleware } from "@middlewares"

class YookassaWebhook {
    public post: Array<Middleware> = [
        checkYookassa,
        asyncErrorCatcher(async (req, res, next) => {
            console.log("YookassaWebhookPost - 1")
            const paymentId: string = req.body.object.id

            let set: void | Error | object = new Object()

            switch (req.body.event) {
                case YookassaEvents.PaymentSucceeded:
                    set = await this.setPaymentStatus(paymentId, PaymentStatuses.Succeeded)

                case YookassaEvents.PaymentCanceled:
                    set = await this.setPaymentStatus(paymentId, PaymentStatuses.Canceled)

                case YookassaEvents.RefundSucceeded:
                    set = await this.setPaymentStatus(paymentId, PaymentStatuses.Refunded)
            }

            console.log("YookassaWebhook - 2")

            if (set instanceof Error) {
                res.sendStatus(500)
            }

            res.sendStatus(200)

            next()
        })
    ]

    private async setPaymentStatus(paymentId: string, paymentStatus: PaymentStatus): Promise<void | Error> {
        console.log("SetPaymentStatus - 1")
        const order: Order | Error = await Order.fromPaymentId(paymentId)
        console.log("SetPaymentStatus - 2")

        if (order instanceof Error) {
            return order
        }

        const edit: void | Error = await order.edit({ paymentStatus })

        if (edit instanceof Error) {
            return edit
        }
    }
}

export default new YookassaWebhook()
