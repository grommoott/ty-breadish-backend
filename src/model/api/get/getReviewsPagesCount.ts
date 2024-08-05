import bdClient from "@api/bdClient"
import config from "@api/config"
import { QueryResult } from "pg"

export default async function getReviewsPagesCount(itemId: number): Promise<number | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select count(*) from reviews where target=${itemId}`)

        return Math.ceil(response.rows[0].count / config.reviewsPageSize)
    } catch (e) {
        const msg = "Error in getReviewsPagesCount request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
