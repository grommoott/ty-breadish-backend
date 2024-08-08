import bdClient from "@api/bdClient";
import config from "@api/config";
import { INew, queryRowToNew } from "@interfaces";
import { MediaId, Moment, NewId } from "@primitives";
import { QueryResult } from "pg";

export default async function getNewsPage(page: number): Promise<Array<INew>> {
    try {
        const response: QueryResult = await bdClient.query(`select * from news order by moment desc limit ${config.newsPageSize} offset ${config.newsPageSize * page}`)

        return response.rows.map(queryRowToNew)
    } catch (e) {
        const msg = "Error in getNewsPage request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
