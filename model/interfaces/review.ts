/** Review's interface. Review can be only under product or recipe
 *
 * id: Id<Review>
 * from: Id<User>
 * content: string
 * rate: number (between 1 and 5)
 */
interface IBDReview {
    id: string,
    target: string,
    from: string,
    content: string,
    rate: number
}

export default IBDReview
