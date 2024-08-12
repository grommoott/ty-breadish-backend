const CourierOrderStates = {
    RequestSent: "requestSent",
    Cooking: "cooking",
    WaitingForCourier: "waitingForCourier",
    Delivering: "delivering"
}

type CourierOrderState = typeof CourierOrderStates[keyof typeof CourierOrderStates]

export { CourierOrderState, CourierOrderStates }
