import bdClient from "@api/bdClient";
import { Id } from "@primitives";
import { QueryResult } from "pg";

export default function createDeleteRequest<T extends Id>(entityName: string, requestName: string): (id: T) => Promise<boolean | Error> {
    return async function(id: T) {
        try {
            const response: QueryResult = await bdClient.query(`delete from ${entityName} where id=${id}`)

            return response.rowCount == 1
        } catch (e) {
            const msg = `Error in ${requestName} request: ` + e
            console.error(msg)
            return new Error(msg, { cause: 500 })
        }
    }
}
