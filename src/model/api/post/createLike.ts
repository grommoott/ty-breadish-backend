import bdClient from "@api/bdClient";
import getMedia from "@api/get/getMedia";
import getUser from "@api/get/getUser";
import { LikeType, LikeTypes } from "@enums";
import { ILike, IMedia, IUser, queryRowToLike } from "@interfaces";
import { Id, LikeId, MediaId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createLike(from: UserId, target: MediaId, type: LikeType = LikeTypes.Media): Promise<ILike | Error> {
    try {
        const userWithId: IUser | Error = await getUser(from)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const mediaWithId: IMedia | Error = await getMedia(target)

        if (mediaWithId instanceof Error) {
            return mediaWithId
        }

        const likes: QueryResult = await bdClient.query(`select * from likes where "from"=${from} and target=${target} and type='${type}'`)

        if (likes.rowCount != 0) {
            return new Error(`There is already like from ${from} and with target ${target}(${type})`)
        }

        const response: QueryResult = await bdClient.query(`insert into likes values (default, ${from}, ${target}, '${type}') returning *`)

        return queryRowToLike(response.rows[0])
    } catch (e) {
        const msg = "Error in createLike request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
