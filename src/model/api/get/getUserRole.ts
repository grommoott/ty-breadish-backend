import { UserId } from "@primitives";
import getUser from "./getUser";
import { IUser } from "@interfaces";
import { Role } from "@enums";
import { QueryResult } from "pg";
import bdClient from "@api/bdClient";

export default async function getUserRole(id: UserId): Promise<Role | Error> {
    try {
        const userWithId: IUser | Error = await getUser(id)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const response: QueryResult = await bdClient.query(`select * from roles where user=${id}`)

        return response.rows[0].role
    } catch (e) {
        const msg = "Error in getUserRole request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
