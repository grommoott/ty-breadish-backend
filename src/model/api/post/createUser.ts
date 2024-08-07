import bdClient from "@api/bdClient";
import { IBDUser } from "@interfaces";
import { Email, Hash, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createUser(username: string, passwordHash: Hash, email: Email, id: UserId | null = null, moment: Moment | null = null): Promise<IBDUser | Error> {
    try {
        const _id: string | UserId = (() => {
            if (id === null) {
                return "((select id from users order by id desc limit 1) + 1)"
            } else {
                return id
            }
        })()

        const _moment: Moment = (() => {
            if (moment == null) {
                return new Moment(new Date().getTime())
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into users values (${_id}, '${username}', '${passwordHash}', '${email}', ${_moment}) returning *`)
        const user = response.rows[0]

        return {
            id: new UserId(user.id),
            username: user.username,
            passwordHash: new Hash(user.password_hash),
            email: new Email(user.email),
            moment: new Moment(user.moment)
        }
    } catch (e) {
        const msg = "Error in createUser request" + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
