import { RecipeId } from "@primitives"
import { IItem } from "./item"

interface IBDRecipe extends IItem {
    id: RecipeId,
}

interface IRecipe extends IBDRecipe {
    getReviewsCount: () => Promise<number>,
    loadNextReviewPage: () => Promise<void>,
    loadedReviews: Array<IRecipe>
}

export { IBDRecipe, IRecipe }
