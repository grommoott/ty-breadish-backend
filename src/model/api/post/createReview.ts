import bdClient from "@api/bdClient";
import { IBDReview } from "@interfaces";
import { ItemId, Moment, Rate, ReviewId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createReview(from: UserId, target: ItemId, content: string, rate: Rate, id: ReviewId | null = null, moment: Moment | null = null): Promise<IBDReview | Error | null> {
    try {
        const reviews: QueryResult = await bdClient.query(`select * from reviews where "from"=${from} and target=${target}`)

        if (reviews.rowCount != 0) {
            return null
        }

        const _id: ReviewId | string = (() => {
            if (id === null) {
                return "((select id from reviews order by id limit 1) + 1)"
            } else {
                return id
            }
        })()

        const _moment: Moment = (() => {
            if (moment === null) {
                return Moment.now()
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into reviews values (${_id}, ${from}, ${target}, '${content}', '${rate}', ${moment}) returning *`)
        const review = response.rows[0]

        return {
            id: new ReviewId(review.id),
            from: new UserId(review.from),
            target: new ItemId(review.target),
            content: review.content,
            rate: review.rate,
            moment: new Moment(review.moment)
        }
    } catch (e) {
        const msg = "Error in createReview request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
