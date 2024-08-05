import bdClient from "@api/bdClient";
import { IBDUser } from "@interfaces/user";
import { QueryResult } from "pg";

export default async function getUserByEmail(email: string, check: boolean = false): Promise<IBDUser | Error | null> {
    try {
        const response: QueryResult = await bdClient.query(`select * from users where email='${email}'`)
        const user = response.rows[0]

        if (!user) {
            if (check) {
                return null
            }

            return new Error(`User with such email(${email}) isn't found`, { cause: 400 })
        }

        return {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        }
    } catch (e) {
        const msg = "Error in getUserByEmail request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
