import bdClient from "@api/bdClient"
import { IBakery, queryRowToBakery } from "@interfaces"
import { QueryResult } from "pg"

export default async function getBakeries(): Promise<Array<IBakery> | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from bakeries`)

        return response.rows.map(queryRowToBakery)
    } catch (e) {
        const msg = "Error in getBakeries request " + e
        throw new Error(msg, { cause: 500 })
    }
}
