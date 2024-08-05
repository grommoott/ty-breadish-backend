import bdClient from "@api/bdClient"
import { LikeType } from "@enums"
import { QueryResult } from "pg"

export default async function getLikesCount(parentId: number, type: LikeType): Promise<number | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select count(*) from likes where target=${parentId} and type='${LikeType}'`)

        return response.rows[0].count
    } catch (e) {
        const msg = "Error in getLikesCount request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
