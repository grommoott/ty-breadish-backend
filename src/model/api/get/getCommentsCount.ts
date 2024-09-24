import { MediaId } from "@primitives";
import getMedia from "./getMedia";
import { IComment, IMedia, INew } from "@interfaces";
import bdClient from "@api/bdClient";
import { QueryResult } from "pg";

export default async function getCommentsCount(mediaId: MediaId): Promise<number | Error> {
    try {
        const media: IComment | INew | Error = await getMedia(mediaId)

        if (media instanceof Error) {
            return media
        }

        const response: QueryResult = await bdClient.query(`select count(*) from comments where target=${mediaId.toBDView()}`)
        return response.rows[0].count
    } catch (e) {
        const msg = "Error in getCommentsPage request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
