const CourierOrderStates = {
    RequestSent: "requestSent",
    Cooking: "cooking",
    WaitingForCourier: "waitingForCourier",
    Delivering: "delivering",
    Completed: "completed"
} as const

type CourierOrderState = typeof CourierOrderStates[keyof typeof CourierOrderStates]

export { CourierOrderState, CourierOrderStates }
