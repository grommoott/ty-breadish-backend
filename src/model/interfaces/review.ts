import { ItemId, Moment, Rate, ReviewId, UserId } from "@primitives"

interface IReview {
    id: ReviewId,
    from: UserId,
    target: ItemId,
    content: string,
    rate: Rate,
    moment: Moment
}

function queryRowToReview(row: any): IReview {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "content" in row &&
        "rate" in row &&
        "moment" in row)) {
        throw new Error("Invalid query row to convert into IReview")
    }

    return {
        id: new ReviewId(row.id),
        from: new UserId(row.from),
        target: new ItemId(row.target),
        content: row.content,
        rate: row.rate,
        moment: new Moment(row.moment)
    }
}

export { IReview, queryRowToReview }
