import bdClient from "@api/bdClient"
import { IUser, queryRowToUser } from "@interfaces"
import { Email, Hash, Moment, UserId } from "@primitives"
import { QueryResult } from "pg"

export default async function getUserByUsername(username: string): Promise<IUser | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from users where username='${username}'`)
        const user = response.rows[0]

        if (!user) {
            return new Error(`User with such username(${username}) isn't found`)
        }

        return queryRowToUser(user)
    } catch (e) {
        const msg = "Error in getUserByUsername request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
