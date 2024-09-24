import bdClient from "@api/bdClient";
import getLikeParent from "@api/get/getLikeParent";
import getUser from "@api/get/getUser";
import { LikeType, LikeTypes } from "@enums";
import { pgFormat } from "@helpers";
import { ILike, IMedia, IReview, IUser, queryRowToLike } from "@interfaces";
import { Id, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createLike(from: UserId, target: Id, type: LikeType = LikeTypes.Media): Promise<ILike | Error> {
    try {
        const userWithId: IUser | Error = await getUser(from)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const likeParent: IMedia | IReview | Error = await getLikeParent(target, type)

        if (likeParent instanceof Error) {
            return likeParent
        }

        const likes: QueryResult = await bdClient.query(`select * from likes where "from"=${from} and target=${target} and type='${pgFormat(type)}'`)

        if (likes.rowCount != 0) {
            return new Error(`There is already like from ${from} and with target ${target}(${type})`)
        }

        const response: QueryResult = await bdClient.query(`insert into likes values (default, ${from}, ${target}, '${pgFormat(type)}') returning *`)

        return queryRowToLike(response.rows[0])
    } catch (e) {
        const msg = "Error in createLike request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
