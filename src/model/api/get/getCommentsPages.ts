import bdClient from "@api/bdClient";
import config from "@api/config";
import { QueryResult } from "pg";

export default async function getCommentsPages(mediaId: number): Promise<number | null> {
    try {
        const response: QueryResult = await bdClient.query(`select count(*) from comments where target=${mediaId}`)

        return Math.ceil(response.rows[0].count / config.commentsPageSize)
    } catch (e) {
        console.error("Error in getCommentsPages request:", e)
        return null
    }
}
