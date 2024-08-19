const ImageCategories = {
    News: "news",
    Products: "products",
    Recipies: "recipes",
    Users: "users"
}

type ImageCategory = typeof ImageCategories[keyof typeof ImageCategories]

export { ImageCategory, ImageCategories }
