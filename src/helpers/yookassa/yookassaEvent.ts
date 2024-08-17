const YookassaEvents = {
    PaymentSucceeded: "payment.succeeded",
    PaymentCanceled: "payment.canceled",
    RefundSucceeded: "refund.succeeded"
} as const

type YookassaEvent = typeof YookassaEvents[keyof typeof YookassaEvents]

export { YookassaEvent, YookassaEvents }
