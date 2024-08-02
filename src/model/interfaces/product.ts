import { IReview } from "./index.js"

/** Interface for BDProduct
 *
 * id: Id<Product>
 * itemId: ItemId
 * name: string
 * price: Price
 * avgRate: number
 * */
interface IBDProduct {
    id: number,
    itemId: number,
    name: string,
    price: number,
    avgRate: number
}

/** Interface for Product
 *
 * id: Id<Product>
 * itemId: ItemId
 * name: string
 * price: Price
 * avgRate: number
 * getReviewsCount: () => number
 * loadReviews: () => void
 * loadedReviews: Array<Review>
 * */
interface IProduct {
    id: number,
    itemId: number,
    name: string,
    price: number,
    avgRate: number,
    getReviewsCount: () => Promise<number>,
    loadReviews: () => Promise<void>,
    loadedReviews: Array<IReview>
}

export { IBDProduct, IProduct } 
