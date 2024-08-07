import { ItemId, Moment, Rate, ReviewId, UserId } from "@primitives"

interface IBDReview {
    id: ReviewId,
    from: UserId,
    target: ItemId,
    content: string,
    rate: Rate,
    moment: Moment
}

interface IReview extends IBDReview { }

export { IBDReview, IReview }
