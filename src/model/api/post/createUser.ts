import bdClient from "@api/bdClient";
import { IBDUser } from "@interfaces/user";
import { QueryResult } from "pg";

export default async function createUser(username: string, passwordHash: string, email: string, id: number | null = null, moment: number | null = null): Promise<IBDUser | Error> {
    try {
        const _id: string | number = (() => {
            if (id === null) {
                return "(select count(*) from users)"
            } else {
                return id
            }
        })()

        const _moment: number = (() => {
            if (moment == null) {
                return new Date().getTime()
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into users values (${_id}, '${username}', '${passwordHash}', '${email}', ${_moment}) returning *`)
        const user = response.rows[0]

        return {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        }
    } catch (e) {
        const msg = "Error in createUser request" + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
