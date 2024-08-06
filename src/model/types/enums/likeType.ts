const LikeTypes = {
    Media: "media",
    Item: "item",
    Review: "review"
}

type LikeType = typeof LikeTypes[keyof typeof LikeTypes]

export { LikeType, LikeTypes }
