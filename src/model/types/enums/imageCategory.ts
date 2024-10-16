const ImageCategories = {
    News: "news",
    Products: "products",
    Recipes: "recipes",
    Users: "users",
    Images: "images"
}

type ImageCategory = typeof ImageCategories[keyof typeof ImageCategories]

export { ImageCategory, ImageCategories }
