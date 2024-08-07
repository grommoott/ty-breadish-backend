import { IReview } from "../review"
import { Price, ProductId } from "@primitives"
import { IItem } from "./item"

interface IBDProduct extends IItem {
    id: ProductId,
    price: Price,
}

interface IProduct extends IBDProduct {
    getReviewsCount: () => Promise<number>,
    loadNextReviewPage: () => Promise<void>,
    loadedReviews: Array<IReview>
}

export { IBDProduct, IProduct } 
