import bdClient from "@api/bdClient";
import config from "@api/config";
import { IBDComment } from "@interfaces";
import { CommentId, MediaId, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createComment(from: UserId, target: MediaId, content: string, moment: Moment | null = null): Promise<IBDComment> {
    try {
        const _moment: Moment = (() => {
            if (moment == null) {
                return new Moment(new Date().getTime())
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into comments values(default, nextval('media_id'), ${from}, ${target}, '${content}', ${_moment}, false) returning *`)
        const comment = await response.rows[0]

        return {
            id: new CommentId(comment.id),
            mediaId: new MediaId(comment.media_id),
            from: new UserId(comment.from),
            target: new MediaId(comment.target),
            content: comment.content,
            moment: new Moment(comment.moment),
            isEdited: comment.is_edited
        }
    } catch (e) {
        const msg = "Error in createComment request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
