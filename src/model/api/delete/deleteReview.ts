import { ReviewId } from "@primitives";
import updateItemRate from "@api/put/updateItemRate";
import getReview from "@api/get/getReview";
import { IReview } from "@interfaces";
import bdClient from "@api/bdClient";
import { QueryResult } from "pg";

export default async function deleteReview(id: ReviewId): Promise<boolean | Error> {
    try {
        const reviewsWithId: IReview | Error = await getReview(id)

        if (reviewsWithId instanceof Error) {
            return reviewsWithId
        }

        const response: QueryResult = await bdClient.query(`delete from reviews where id=${id}`)
        await updateItemRate(reviewsWithId.target)

        return response.rowCount !== 0
    } catch (e) {
        const msg = "Error in deleteReview request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
