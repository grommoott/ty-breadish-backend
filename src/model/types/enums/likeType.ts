const LikeTypes = {
    Media: "media",
    Review: "review"
} as const

type LikeType = typeof LikeTypes[keyof typeof LikeTypes]

export { LikeType, LikeTypes }
