import bdClient from "@api/bdClient";
import { QueryResult } from "pg";
import { Coords } from "@primitives";
import { IBakery, queryRowToBakery } from "@interfaces";

export default async function createBakery(address: string, coords: Coords): Promise<IBakery | Error> {
    try {
        const response: QueryResult = await bdClient.query(`insert into bakeries values (default, ${address}, '${coords}') returning *`)

        return queryRowToBakery(response.rows[0])
    } catch (e) {
        const msg = "Error in createBakery request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
