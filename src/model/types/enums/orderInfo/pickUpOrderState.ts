const PickUpOrderStates = {
    RequestSent: "requestSent",
    Cooking: "cooking",
    Waiting: "waiting"
} as const

type PickUpOrderState = typeof PickUpOrderStates[keyof typeof PickUpOrderStates]

export { PickUpOrderState, PickUpOrderStates }
