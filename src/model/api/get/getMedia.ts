import bdClient from "@api/bdClient";
import { IComment, INew, queryRowToComment, queryRowToNew } from "@interfaces";
import { MediaId } from "@primitives";
import { QueryResult } from "pg";

export default async function getMedia(id: MediaId): Promise<IComment | INew | Error> {
    try {
        const commentWithMediaId: QueryResult = await bdClient.query(`select * from comments where media_id=${id}`)

        if (commentWithMediaId.rowCount != 0) {
            return queryRowToComment(commentWithMediaId.rows[0])
        }

        const newWithMediaId: QueryResult = await bdClient.query(`select * from news where media_id=${id}`)

        if (newWithMediaId.rowCount != 0) {
            return queryRowToNew(newWithMediaId.rows[0])
        }

        return new Error(`Media with such mediaId(${id}) isn't exists`)
    } catch (e) {
        const msg = "Error in getMedia request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
