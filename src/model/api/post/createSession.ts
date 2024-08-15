import bdClient from "@api/bdClient";
import getSessionByUserDevice from "@api/get/getSessionByUserDevice";
import { pgFormat } from "@helpers";
import { ISession, queryRowToSession } from "@interfaces";
import { Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createSession(userId: UserId, deviceId: string, moment?: Moment): Promise<ISession | Error> {
    try {
        const sessionWithUserDevice: ISession | Error = await getSessionByUserDevice(userId, deviceId)

        if (!(sessionWithUserDevice instanceof Error)) {
            return new Error(`There is already session with userId ${userId} and deviceId ${deviceId}`)
        }

        const _moment: Moment = (() => {
            if (!moment) {
                return Moment.now()
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into sessions values (default, ${userId}, NULL, '${pgFormat(deviceId)}', ${_moment}) returning *`)

        return queryRowToSession(response.rows[0])
    } catch (e) {
        const msg = "Error in createSession request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
