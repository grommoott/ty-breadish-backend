const ReviewsSortOrders = {
    NewFirst: "newFirst",
    OldFirst: "oldFirst",
    LikedFirst: "likedFirst",
    RatedFirst: "ratedFirst",
    UnratedFirst: "unratedFirst"
} as const

type ReviewsSortOrder = typeof ReviewsSortOrders[keyof typeof ReviewsSortOrders]

export { ReviewsSortOrder, ReviewsSortOrders }
