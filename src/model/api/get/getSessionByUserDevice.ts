import bdClient from "@api/bdClient";
import { ISession, queryRowToSession } from "@interfaces";
import { UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function getSessionByUserDevice(userId: UserId, deviceId: string): Promise<ISession | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from sessions where user_id=${userId} and deviceId='${deviceId}'`)

        if (response.rowCount == 0) {
            return new Error(`Session with such userId(${userId}) and deviceId(${deviceId}) isn't found`)
        }

        return queryRowToSession(response.rows[0])
    } catch (e) {
        const msg = "Error in getSessionByUserDevice request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
