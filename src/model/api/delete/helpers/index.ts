import bdClient from "@api/bdClient";
import { Id } from "@primitives";
import { QueryResult } from "pg";

export default function createDeleteRequest<T extends Id>(tableName: string, requestName: string): (id: T) => Promise<boolean> {
    return async function(id: T) {
        try {
            const response: QueryResult = await bdClient.query(`delete from ${tableName} where id=${id}`)

            return response.rowCount != 0
        } catch (e) {
            const msg = `Error in ${requestName} request: ` + e
            throw new Error(msg, { cause: 500 })
        }
    }
}
