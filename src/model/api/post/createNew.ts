import bdClient from "@api/bdClient";
import { INew, queryRowToNew } from "@interfaces";
import { MediaId, Moment, NewId } from "@primitives";
import { QueryResult } from "pg";

export default async function createNew(title: string, content: string, moment: Moment | null = null): Promise<INew> {
    try {
        const _moment: Moment = (() => {
            if (moment === null) {
                return Moment.now()
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into news values (default, nextval('media_id'), '${title}', '${content}', ${_moment}, false) returning *`)

        return queryRowToNew(response.rows[0])
    } catch (e) {
        const msg = "Error in createNew request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
