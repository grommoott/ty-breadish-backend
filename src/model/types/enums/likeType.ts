const LikeTypes = {
    Media: "media",
    Item: "item",
    Review: "review"
} as const

type LikeType = typeof LikeTypes[keyof typeof LikeTypes]

export { LikeType, LikeTypes }
