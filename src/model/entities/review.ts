import deleteReview from "@api/delete/deleteReview"
import getReview from "@api/get/getReview"
import getReviewsPage from "@api/get/getReviewsPage"
import createReview from "@api/post/createReview"
import updateReview from "@api/put/updateReview"
import { ReviewsSortOrder, Rate } from "@enums"
import { IReview } from "@interfaces"
import { ItemId, Moment, ReviewId, UserId } from "@primitives"
import { Entity } from "./entity"

class Review extends Entity {

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

    public async delete(): Promise<boolean | Error> {
        return await deleteReview(this._review.id)
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

    public static async create(from: UserId, target: ItemId, content: string, rate: Rate): Promise<Review | Error> {
        const review: IReview | Error = await createReview(from, target, content, rate)

        if (review instanceof Error) {
            return review
        }

        return new Review(review)
    }

    public override toNormalView(): object {
        return {
            id: this._review.id.id,
            from: this._review.from.id,
            target: this._review.target.id,
            content: this._review.content,
            moment: this._review.moment.moment,
            rate: this._review.rate
        }
    }

    private constructor({ id, from, target, content, moment, rate }: IReview) {
        super()

        this._review = { id, from, target, content, moment, rate }
    }
}

export { Review }
