const CommentsSortOrders = {
    NewFirst: "newFirst",
    OldFirst: "oldFirst",
    LikedFirst: "likedFirst"
} as const

type CommentsSortOrder = typeof CommentsSortOrders[keyof typeof CommentsSortOrders]

export { CommentsSortOrder, CommentsSortOrders }
