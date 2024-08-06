import { AvgRate, ItemId, Price, ProductId } from "@primitives"
import { IReview } from "./review"

/** Interface for BDProduct
 *
 * id: ProductId
 * itemId: ItemId
 * name: string
 * price: Price
 * avgRate: number
 * */
interface IBDProduct {
    id: ProductId,
    itemId: ItemId,
    name: string,
    price: Price,
    avgRate: AvgRate
}

/** Interface for Product
 *
 * id: ProductId
 * itemId: ItemId
 * name: string
 * price: Price
 * avgRate: number
 * getReviewsCount: () => number
 * loadNextReviewPage: () => void
 * loadedReviews: Array<Review> */
interface IProduct {
    id: ProductId,
    itemId: ItemId,
    name: string,
    price: Price,
    avgRate: AvgRate
    getReviewsCount: () => Promise<number>,
    loadNextReviewPage: () => Promise<void>,
    loadedReviews: Array<IReview>
}

export { IBDProduct, IProduct } 
