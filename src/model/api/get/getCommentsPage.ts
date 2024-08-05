import bdClient from "@api/bdClient";
import config from "@api/config";
import { CommentsSortOrder } from "@enums";
import { IBDComment } from "@interfaces/comment";
import { QueryResult } from "pg";

export default async function getCommentsPage(mediaId: number, sortOrder: CommentsSortOrder, page: number): Promise<Array<IBDComment> | Error> {
    try {
        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case CommentsSortOrder.NewFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentsSortOrder.OldFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentsSortOrder.LikedFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by (select count(*) from likes where target=${mediaId}) desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)
            }
        })()

        return response.rows.map(comment => {
            return {
                id: comment.id,
                mediaId: comment.media_id,
                from: comment.from,
                target: comment.target,
                content: comment.content,
                moment: comment.moment
            }
        })
    } catch (e) {
        const msg = "Error in getCommentsPage request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
