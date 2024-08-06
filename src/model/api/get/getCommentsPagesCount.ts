import bdClient from "@api/bdClient";
import config from "@api/config";
import { MediaId } from "@primitives";
import { QueryResult } from "pg";

export default async function getCommentsPagesCount(mediaId: MediaId): Promise<number | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select count(*) from comments where target=${mediaId}`)

        return Math.ceil(response.rows[0].count / config.commentsPageSize)
    } catch (e) {
        const msg = "Error in getCommentsPagesCount request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
