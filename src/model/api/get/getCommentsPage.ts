import bdClient from "@api/bdClient";
import config from "@api/config";
import { CommentsSortOrder, CommentsSortOrders } from "@enums";
import { IBDComment } from "@interfaces";
import { CommentId, MediaId, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function getCommentsPage(mediaId: MediaId, sortOrder: CommentsSortOrder, page: number): Promise<Array<IBDComment>> {
    try {
        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case CommentsSortOrders.NewFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentsSortOrders.OldFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentsSortOrders.LikedFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by (select count(*) from likes where target=${mediaId}) desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)
            }
        })()

        return response.rows.map((comment): IBDComment => {
            return {
                id: new CommentId(comment.id),
                mediaId: new MediaId(comment.media_id),
                from: new UserId(comment.from),
                target: new MediaId(comment.target),
                content: comment.content,
                moment: new Moment(comment.moment),
                isEdited: comment.is_edited
            }
        })
    } catch (e) {
        const msg = "Error in getCommentsPage request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
