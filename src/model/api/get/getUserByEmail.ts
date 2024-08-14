import bdClient from "@api/bdClient";
import { pgFormat } from "@helpers";
import { IUser, queryRowToUser } from "@interfaces";
import { Email, Hash, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function getUserByEmail(email: Email): Promise<IUser | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from users where email='${pgFormat(email)}'`)
        const user = response.rows[0]

        if (!user) {
            return new Error(`User with such email(${email}) isn't found`, { cause: 400 })
        }

        return queryRowToUser(user)
    } catch (e) {
        const msg = "Error in getUserByEmail request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
