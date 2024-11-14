import { IItem, IReview, IUser, queryRowToReview } from "@interfaces";
import { ItemId, UserId } from "@primitives";
import getUser from "./getUser";
import getItem from "./getItem";
import { QueryResult } from "pg";
import bdClient from "@api/bdClient";

export default async function getReviewByItemUser(target: ItemId, user: UserId): Promise<IReview | Error> {
    try {
        const userWithId: IUser | Error = await getUser(user)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const targetWithId: IItem | Error = await getItem(target)

        if (targetWithId instanceof Error) {
            return targetWithId
        }

        const review: QueryResult = await bdClient.query(`select * from reviews where target=${target} and "from"=${user}`)

        if (review.rowCount == 0) {
            return new Error("This user have not written review on this item")
        }

        return queryRowToReview(review.rows[0])
    } catch (e) {
        const msg = "Error in getReviewByUser request: " + e
        throw new Error(msg)
    }
}
