import { Rate } from "@enums"

/** IBDReview's interface. IBDReview can be only under product or recipe
 *
 * id: Id<Review>
 * target: ItemId
 * from: Id<User>
 * content: string
 * rate: Rate
 */
interface IBDReview {
    id: number,
    target: number,
    from: number,
    content: string,
    rate: Rate
}

/** Review's interface. Review can be only under product or recipe
 *
 * id: Id<Review>
 * target: ItemId
 * from: Id<User>
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
