import bdClient from "@api/bdClient";
import { ILike, IUser, queryRowToLike } from "@interfaces";
import { Id, LikeId, UserId } from "@primitives";
import { QueryResult } from "pg";
import getUser from "./getUser";

export default async function getUserLiked(userId: UserId): Promise<Array<ILike> | Error> {
    try {
        const userWithId: IUser | Error = await getUser(userId)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const response: QueryResult = await bdClient.query(`select * from likes where "from"=${userId}`)

        return response.rows.map(queryRowToLike)
    } catch (e) {
        const msg = "Error in getUserLiked request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
