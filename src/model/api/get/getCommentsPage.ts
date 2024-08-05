import bdClient from "@api/bdClient";
import config from "@api/config";
import { CommentSortOrder } from "@enums";
import { IBDComment } from "@interfaces/comment";
import { QueryResult } from "pg";

export default async function getCommentsPage(mediaId: number, sortOrder: CommentSortOrder, page: number): Promise<Array<IBDComment> | null> {
    try {
        const response: QueryResult = await (() => {
            switch (sortOrder) {
                case CommentSortOrder.NewFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment desc limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentSortOrder.OldFirst:
                    return bdClient.query(`select * from comments where target=${mediaId} order by moment limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)

                case CommentSortOrder.LikesCount:
                    return bdClient.query(`select * from comments where target=${mediaId} order by (select count(*) from likes where target=${mediaId}) limit ${config.commentsPageSize} offset ${config.commentsPageSize * page}`)
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
        console.error("Error in getCommentsPage request:", e)
        return null
    }
}
