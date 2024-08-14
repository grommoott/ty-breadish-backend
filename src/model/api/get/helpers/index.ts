import bdClient from "@api/bdClient";
import { Id } from "@primitives";
import { QueryResult } from "pg";

export default function createSimpleGetRequest<IdType extends Id, ReturningType>(tableName: string, entityName: string, parseQueryRow: (row: any) => ReturningType): (id: IdType) => Promise<ReturningType | Error> {
    return async function(id: IdType) {
        try {
            const response: QueryResult = await bdClient.query(`select * from ${tableName} where id=${id.toBDView()}`)

            if (response.rowCount == 0) {
                return new Error(`${entityName} with such id(${id}) isn't exists`)
            }

            return parseQueryRow(response.rows[0])
        } catch (e) {
            const msg = `Error in get${entityName} request: ` + e
            throw new Error(msg, { cause: 500 })
        }
    }
}
