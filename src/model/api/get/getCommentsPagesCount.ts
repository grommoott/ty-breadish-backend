import bdClient from "@api/bdClient";
import config from "@api/config";
import { IMedia } from "@interfaces";
import { MediaId } from "@primitives";
import { QueryResult } from "pg";
import getMedia from "./getMedia";

export default async function getCommentsPagesCount(mediaId: MediaId): Promise<number | Error> {
    try {
        const mediaWithId: IMedia | Error = await getMedia(mediaId)

        if (mediaWithId instanceof Error) {
            return mediaWithId
        }

        const response: QueryResult = await bdClient.query(`select count(*) from comments where target=${mediaId}`)

        return Math.ceil(response.rows[0].count / config.commentsPageSize)
    } catch (e) {
        const msg = "Error in getCommentsPagesCount request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
