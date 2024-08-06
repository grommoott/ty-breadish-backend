import { ItemId, Rate, ReviewId, UserId } from "@primitives"

/** IBDReview's interface. IBDReview can be only under product or recipe
 *
 * id: ReviewId
 * target: ItemId
 * from: UserId
 * content: string
 * rate: Rate
 */
interface IBDReview {
    id: ReviewId,
    target: ItemId,
    from: UserId,
    content: string,
    rate: Rate
}

/** Review's interface. Review can be only under product or recipe
 *
 * id: ReviewId
 * target: ItemId
 * from: UserId
 * content: string
 * rate: Rate
 */
interface IReview {
    id: number,
    target: number,
    from: number,
    content: string,
    rate: Rate
}

export { IBDReview, IReview }
