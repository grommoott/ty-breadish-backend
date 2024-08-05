import bdClient from "@api/bdClient";
import config from "@api/config";
import { IBDNew } from "@interfaces/new";
import { QueryResult } from "pg";

export default async function getNewsPage(page: number): Promise<Array<IBDNew> | Error> {
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
        const msg = "Error in getNewsPage request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
