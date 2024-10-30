import bdClient from "@api/bdClient";
import config from "@api/config";
import { CommentsSortOrder, CommentsSortOrders } from "@enums";
import { IComment, IMedia, queryRowToComment } from "@interfaces";
import { CommentId, MediaId, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";
import getMedia from "./getMedia";

export default async function getCommentsPage(mediaId: MediaId, sortOrder: CommentsSortOrder, page: number): Promise<Array<IComment> | Error> {
    try {
        const mediaWithId: IMedia | Error = await getMedia(mediaId)

        if (mediaWithId instanceof Error) {
            return mediaWithId
        }

        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case CommentsSortOrders.NewFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentsSortOrders.OldFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentsSortOrders.LikedFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by (select count(*) from likes where target=comments.media_id) desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)
            }
        })()

        return response.rows.map(queryRowToComment)
    } catch (e) {
        const msg = "Error in getCommentsPage request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
