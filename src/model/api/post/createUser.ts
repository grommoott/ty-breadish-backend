import bdClient from "@api/bdClient";
import getUserByEmail from "@api/get/getUserByEmail";
import getUserByUsername from "@api/get/getUserByUsername";
import { IUser, queryRowToUser } from "@interfaces";
import { Email, Hash, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createUser(username: string, passwordHash: Hash, email: Email, moment: Moment | null = null): Promise<IUser | Error> {
    try {
        const usersWithUsername: IUser | Error = await getUserByUsername(username)

        if (!(usersWithUsername instanceof Error)) {
            return new Error(`User with such username(${username}) is already exists`, { cause: 400 })
        }

        const usersWithEmail: IUser | Error = await getUserByEmail(email)

        if (!(usersWithEmail instanceof Error)) {
            return new Error(`User with such email(${email}) is already exists`, { cause: 400 })
        }

        const _moment: Moment = (() => {
            if (moment == null) {
                return new Moment(new Date().getTime())
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into users values (default, '${username}', '${passwordHash}', '${email}', ${_moment}) returning *`)

        return queryRowToUser(response.rows[0])
    } catch (e) {
        const msg = "Error in createUser request" + e
        return new Error(msg, { cause: 500 })
    }
}
