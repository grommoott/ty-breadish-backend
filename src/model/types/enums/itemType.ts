const ItemTypes = {
    Product: "product",
    Recipe: "recipe"
} as const

type ItemType = typeof ItemTypes[keyof typeof ItemTypes]

export { ItemType, ItemTypes }
