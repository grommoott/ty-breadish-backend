import bdClient from "@api/bdClient"
import { LikeType } from "@enums"
import { Id } from "@primitives"
import { QueryResult } from "pg"
import { IItem, IMedia, IReview } from "@interfaces"
import getLikeParent from "./getLikeParent"

export default async function getLikesCount(parentId: Id, type: LikeType): Promise<number | Error> {
    try {
        const likeParent: IItem | IMedia | IReview | Error = await getLikeParent(parentId, type)

        if (likeParent instanceof Error) {
            return likeParent
        }

        const response: QueryResult = await bdClient.query(`select count(*) from likes where target=${parentId} and type='${type}'`)

        return response.rows[0].count
    } catch (e) {
        const msg = "Error in getLikesCount request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
