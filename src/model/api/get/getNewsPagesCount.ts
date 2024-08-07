import bdClient from "@api/bdClient";
import config from "@api/config";
import { QueryResult } from "pg";

export default async function getNewsPagesCount(): Promise<number> {
    try {
        const response: QueryResult = await bdClient.query('select count(*) from news')

        return Math.ceil(response.rows[0].count / config.newsPageSize)
    } catch (e) {
        const msg = "Error in getNewsPagesCount request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
