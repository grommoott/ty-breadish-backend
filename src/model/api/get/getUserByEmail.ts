import bdClient from "@api/bdClient";
import { IBDUser } from "@interfaces";
import { Email, Hash, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function getUserByEmail(email: Email): Promise<IBDUser | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from users where email='${email}'`)
        const user = response.rows[0]

        if (!user) {
            return new Error(`User with such email(${email}) isn't found`, { cause: 400 })
        }

        return {
            id: new UserId(user.id),
            username: user.username,
            passwordHash: new Hash(user.password_hash),
            email: new Email(user.email),
            moment: new Moment(user.moment)
        }
    } catch (e) {
        const msg = "Error in getUserByEmail request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
