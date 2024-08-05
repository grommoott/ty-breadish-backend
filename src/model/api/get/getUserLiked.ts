import bdClient from "@api/bdClient";
import { IBDLike } from "@interfaces/like";
import { QueryResult } from "pg";

export default async function getUserLiked(userId: number): Promise<Array<IBDLike> | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from likes where "from"=${userId}`)

        return response.rows.map(item => {
            return {
                id: item.id,
                from: item.from,
                target: item.target,
            }
        })
    } catch (e) {
        const msg = "Error in getUserLiked request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
