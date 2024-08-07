import bdClient from "@api/bdClient";
import config from "@api/config";
import { IBDComment } from "@interfaces";
import { CommentId, MediaId, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createComment(from: UserId, target: MediaId, content: string, id: CommentId | null = null, moment: Moment | null = null): Promise<IBDComment | Error> {
    try {
        const _id: string | CommentId = (() => {
            if (id === null) {
                return "((select id from comments order by id desc limit 1) + 1)"
            } else {
                return id
            }
        })()

        const _mediaId: string = `(${config.mediaIdCommentOffset} + ${_id})`

        const _moment: Moment = (() => {
            if (moment == null) {
                return new Moment(new Date().getTime())
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into comments values(${_id}, ${_mediaId}, ${from}, ${target}, '${content}', ${_moment}) returning *`)
        const comment = response.rows[0]

        return {
            id: new CommentId(comment.id),
            mediaId: new MediaId(comment.mediaId),
            from: new UserId(comment.from),
            target: new MediaId(comment.target),
            content: comment.content,
            moment: new Moment(comment.moment)
        }
    } catch (e) {
        const msg = "Error in createComment request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
