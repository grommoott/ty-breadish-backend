import { AvgRate, ItemId, RecipeId } from "@primitives"

/** Interface for BDRecipe. IRecipe itseft loading as raw html
 *
 * id: RecipeId
 * itemId: ItemId
 * name: string
 * avgRate: number
 * */
interface IBDRecipe {
    id: RecipeId,
    itemId: ItemId,
    name: string,
    avgRate: AvgRate
}

/** Interface for IRecipe
 * 
 * id: RecipeId
 * itemId: ItemId
 * name: string
 * avgRate: number 
 * getReviewsCount: () => Promise<number>
 * loadNextReviewPage: () => Promise<void>
 * loadedReviews: Array<Recipe>
 * */
interface IRecipe {
    id: RecipeId,
    itemId: ItemId,
    name: string,
    avgRate: AvgRate
    getReviewsCount: () => Promise<number>,
    loadNextReviewPage: () => Promise<void>,
    loadedReviews: Array<IRecipe>
}

export { IBDRecipe, IRecipe }
