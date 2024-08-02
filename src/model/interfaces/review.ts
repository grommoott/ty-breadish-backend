/** IBDReview's interface. IBDReview can be only under product or recipe
 *
 * id: Id<Review>
 * target: ItemId
 * from: Id<User>
 * content: string
 * rate: number (between 1 and 5)
 */
interface IBDReview {
    id: number,
    target: number,
    from: number,
    content: string,
    rate: number
}

/** Review's interface. Review can be only under product or recipe
 *
 * id: Id<Review>
 * target: ItemId
 * from: Id<User>
 * content: string
 * rate: number (between 1 and 5)
 */
interface IReview {
    id: number,
    target: number,
    from: number,
    content: string,
    rate: number
}

export { IBDReview, IReview }
