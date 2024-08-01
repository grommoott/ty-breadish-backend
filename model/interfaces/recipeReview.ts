/** Interface for review of recipe
 *
 * id: Id<RecipeReview>
 * target: Id<Recipe>
 * from: Id<User>
 * content: string
 * rate: number
 * */
interface IBDRecipeReview {
    id: string,
    target: string,
    from: string,
    content: string,
    rate: number
}

export default IBDRecipeReview
