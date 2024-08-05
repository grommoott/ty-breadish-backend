import bdClient from "@api/bdClient";
import config from "@api/config";
import { QueryResult } from "pg";

export default async function getNewsPagesCount(): Promise<number | null> {
    try {
        const response: QueryResult = await bdClient.query('select count(*) from news')

        return Math.ceil(response.rows[0].count / config.newsPageSize)
    } catch (e) {
        console.error("Error in getNewsPages request:", e)
        return null
    }
}
