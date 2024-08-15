import bdClient from "@api/bdClient";
import getItem from "@api/get/getItem";
import getUser from "@api/get/getUser";
import { pgFormat } from "@helpers";
import { IItem, IReview, IUser, queryRowToReview } from "@interfaces";
import { ItemId, Moment, Rate, ReviewId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createReview(from: UserId, target: ItemId, content: string, rate: Rate, moment?: Moment): Promise<IReview | Error> {
    try {
        const userWithId: IUser | Error = await getUser(from)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const itemWithId: IItem | Error = await getItem(target)

        if (itemWithId instanceof Error) {
            return itemWithId
        }

        const reviews: QueryResult = await bdClient.query(`select * from reviews where "from"=${from} and target=${target}`)

        if (reviews.rowCount != 0) {
            return new Error(`There is already review from ${from} to ${target}`)
        }

        const _moment: Moment = (() => {
            if (!moment) {
                return Moment.now()
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into reviews values (default, ${from}, ${target}, '${pgFormat(content)}', '${pgFormat(rate)}', ${_moment}) returning *`)

        return queryRowToReview(response.rows[0])
    } catch (e) {
        const msg = "Error in createReview request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
