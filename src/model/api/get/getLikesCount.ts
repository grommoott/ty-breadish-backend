import bdClient from "@api/bdClient"
import { LikeType } from "@enums"
import { Id } from "@primitives"
import { QueryResult } from "pg"

export default async function getLikesCount(parentId: Id, type: LikeType): Promise<number> {
    try {
        const response: QueryResult = await bdClient.query(`select count(*) from likes where target=${parentId} and type='${type}'`)

        return response.rows[0].count
    } catch (e) {
        const msg = "Error in getLikesCount request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
