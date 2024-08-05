import bdClient from "@api/bdClient";
import config from "@api/config";
import { IBDComment } from "@interfaces/comment";
import { QueryResult } from "pg";

export default async function createComment(from: number, target: number, content: string, id: number | null = null, moment: number | null = null): Promise<IBDComment | Error> {
    try {
        const _id: string | number = (() => {
            if (id == null) {
                return "(select count(*) from comments)"
            } else {
                return id
            }
        })()

        const _mediaId: string = `${config.mediaIdCommentOffset} + ${_id}`

        const _moment: number = (() => {
            if (moment == null) {
                return new Date().getTime()
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into comments values(${_id}, ${_mediaId}, ${from}, ${target}, '${content}', ${_moment}) returning *`)
        const comment = response.rows[0]

        return {
            id: comment.id,
            mediaId: comment.mediaId,
            from: comment.from,
            target: comment.target,
            content: comment.content,
            moment: comment.moment
        }
    } catch (e) {
        const msg = "Error in createComment request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
