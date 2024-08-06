const ItemsSortOrders = {
    DearsFirst: "dearsFirst",
    CheapFirst: "cheapFirst",
    WellRatedFirst: "wellRatedFirst",
    PoorlyRatedFirst: "poorlyRatedFirst"
}

type ItemsSortOrder = typeof ItemsSortOrders[keyof typeof ItemsSortOrders]

export { ItemsSortOrder, ItemsSortOrders }
