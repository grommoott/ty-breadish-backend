import bdClient from "@api/bdClient";
import { LikeType, LikeTypes } from "@enums";
import { IBDLike } from "@interfaces";
import { Id, LikeId, MediaId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createLike(from: UserId, target: MediaId, type: LikeType = LikeTypes.Media): Promise<IBDLike | Error | null> {
    try {
        const likes: QueryResult = await bdClient.query(`select * from likes where "from"=${from} and target=${target} and type='${type}'`)

        if (likes.rowCount != 0) {
            return null
        }

        const response: QueryResult = await bdClient.query(`insert into likes values (default, ${from}, ${target}, '${type}') returning *`)
        const like = response.rows[0]

        return {
            id: new LikeId(like.id),
            from: new UserId(like.from),
            target: new Id(like.target),
            type: like.type
        }
    } catch (e) {
        const msg = "Error in createLike request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
