import getReview from "@api/get/getReview"
import getReviewsPage from "@api/get/getReviewsPage"
import updateReview from "@api/put/updateReview"
import { ReviewsSortOrder } from "@enums"
import { IReview } from "@interfaces"
import { ItemId, Moment, Rate, ReviewId, UserId } from "@primitives"

class Review {

    // Private fields

    private _review: IReview

    // Getters

    public get id(): ReviewId {
        return this._review.id
    }

    public get from(): UserId {
        return this._review.from
    }

    public get target(): ItemId {
        return this._review.target
    }

    public get content(): string {
        return this._review.content
    }

    public get moment(): Moment {
        return this._review.moment
    }

    public get rate(): Rate {
        return this._review.rate
    }

    // Methods

    public async edit(data: { content?: string, rate?: Rate }): Promise<void | Error> {
        return await updateReview(this._review.id, data)
    }

    // Static constructors

    public static async getReviewsPage(itemId: ItemId, sortOrder: ReviewsSortOrder, page: number): Promise<Array<Review> | Error> {
        const reviews: Array<IReview> | Error = await getReviewsPage(itemId, sortOrder, page)

        if (reviews instanceof Error) {
            return reviews
        }

        return reviews.map(review => new Review(review))
    }

    public static async fromId(id: ReviewId): Promise<Review | Error> {
        const review: IReview | Error = await getReview(id)

        if (review instanceof Error) {
            return review
        }

        return new Review(review)
    }

    private constructor({ id, from, target, content, moment, rate }: IReview) {
        this._review = { id, from, target, content, moment, rate }
    }
}

export { Review }
