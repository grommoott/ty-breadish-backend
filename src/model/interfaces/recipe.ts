/** Interface for BDRecipe. IRecipe itseft loading as raw html
 *
 * id: Id<Recipe>
 * itemId: ItemId
 * name: string
 * avgRate: number
 * */
interface IBDRecipe {
    id: number,
    itemId: number,
    name: string,
    avgRate: number
}

/** Interface for IRecipe
 * 
 * id: Id<Recipe>
 * itemId: ItemId
 * name: string
 * avgRate: number 
 * getReviewsCount: () => Promise<number>
 * loadReviews: () => Promise<void>
 * loadedReviews: Array<Recipe>
 * */
interface IRecipe {
    id: number,
    itemId: number,
    name: string,
    avgRate: number,
    getReviewsCount: () => Promise<number>,
    loadReviews: () => Promise<void>,
    loadedReviews: Array<IRecipe>
}

export { IBDRecipe, IRecipe }
