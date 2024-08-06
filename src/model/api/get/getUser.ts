import { QueryResult, QueryResultRow } from "pg";
import bdClient from "@api/bdClient";
import { IBDUser } from "@interfaces/user";
import { Email, Hash, Moment, UserId } from "@primitives";

export default async function getUser(userId: UserId, check: boolean = false): Promise<IBDUser | Error | null> {
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
            id: new UserId(user.id),
            username: user.username,
            passwordHash: new Hash(user.password_hash),
            email: new Email(user.email),
            moment: new Moment(user.moment)
        }
    } catch (e) {
        const msg = "Error in getUser request:" + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
