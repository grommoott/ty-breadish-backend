import bdClient from "@api/bdClient";
import { IBDLike } from "@interfaces";
import { Id, LikeId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function getUserLiked(userId: UserId): Promise<Array<IBDLike>> {
    try {
        const response: QueryResult = await bdClient.query(`select * from likes where "from"=${userId}`)

        return response.rows.map(like => {
            return {
                id: new LikeId(like.id),
                from: new UserId(like.from),
                target: new Id(like.target),
                type: like.type
            }
        })
    } catch (e) {
        const msg = "Error in getUserLiked request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
