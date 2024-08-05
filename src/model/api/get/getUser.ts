import { QueryResult, QueryResultRow } from "pg";
import bdClient from "@api/bdClient";
import { IBDUser } from "@interfaces/user";

export default async function getUser(userId: number, check: boolean = false): Promise<IBDUser | Error | null> {
    try {
        const response: QueryResult = await bdClient.query(`select * from users where id='${userId}'`)
        const user: QueryResultRow = response.rows[0]

        if (!user) {
            if (check) {
                return null
            }

            return new Error(`User with such userId(${userId}) isn't found`, { cause: 400 })
        }

        return {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        }
    } catch (e) {
        const msg = "Error in getUser request:" + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
