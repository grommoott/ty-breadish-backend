const OrderTypes = {
    PickUp: "pickUp",
    Courier: "courier"
} as const

type OrderType = typeof OrderTypes[keyof typeof OrderTypes]

export { OrderType, OrderTypes }
