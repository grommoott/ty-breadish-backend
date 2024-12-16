const PickUpOrderStates = {
    RequestSent: "requestSent",
    Cooking: "cooking",
    Waiting: "waiting",
    Completed: "completed"
} as const

type PickUpOrderState = typeof PickUpOrderStates[keyof typeof PickUpOrderStates]

export { PickUpOrderState, PickUpOrderStates }
