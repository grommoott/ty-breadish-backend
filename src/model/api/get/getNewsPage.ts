import bdClient from "@api/bdClient";
import config from "@api/config";
import { IBDNew } from "@interfaces/new";
import { QueryResult } from "pg";

export default async function getNewsPage(page: number): Promise<Array<IBDNew> | null> {
    try {
        const response: QueryResult = await bdClient.query(`select * from news order by moment desc limit ${config.newsPageSize} offset ${config.newsPageSize * page}`)

        return response.rows.map(aNew => {
            return {
                id: aNew.id,
                mediaId: aNew.media_id,
                title: aNew.title,
                content: aNew.content,
                moment: aNew.moment
            }
        })
    } catch (e) {
        console.error("Error in getNewsPage request:", e)
        return null
    }
}
