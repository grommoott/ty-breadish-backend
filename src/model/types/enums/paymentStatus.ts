const PaymentStatuses = {
    NotSucceeded: "notSucceeded",
    Succeeded: "succeeded",
    Canceled: "canceled",
    Refunded: "refunded"
} as const

type PaymentStatus = typeof PaymentStatuses[keyof typeof PaymentStatuses]

export { PaymentStatus, PaymentStatuses }
