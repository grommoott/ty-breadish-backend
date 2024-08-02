import { QueryResult, QueryResultRow } from "pg";
import bdClient from "../bdClient.js";
import { IBDUser } from "model/interfaces/user.js";

export default async function getUser(userId: number): Promise<IBDUser | null> {
    try {
        const response: QueryResult = await bdClient.query(`select * from users where id='${userId}'`)
        const user: QueryResultRow = response.rows[0]

        if (!user) {
            return null
        }

        const result: IBDUser = {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        }

        return result

    } catch (e) {
        console.error("Error in getUser request:", e)
        return null
    }
}
