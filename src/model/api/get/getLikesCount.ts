import bdClient from "@api/bdClient"
import { QueryResult } from "pg"

export default async function getLikesCount(mediaId: number): Promise<number | null> {
    try {
        const response: QueryResult = await bdClient.query(`select count(*) from likes where target=${mediaId}`)

        return response.rows[0].count
    } catch (e) {
        console.error("Error in getLikes request:", e)
        return null
    }
}
