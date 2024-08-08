import bdClient from "@api/bdClient"
import { LikeType, LikeTypes } from "@enums"
import { Id, ItemId, MediaId, ReviewId } from "@primitives"
import { QueryResult } from "pg"
import getItem from "./getItem"
import getMedia from "./getMedia"
import getReview from "./getReview"

export default async function getLikesCount(parentId: Id, type: LikeType): Promise<number | Error> {
    try {
        let likeParent

        switch (type) {
            case LikeTypes.Item:
                likeParent = await getItem(new ItemId(parentId.id))

            case LikeTypes.Media:
                likeParent = await getMedia(new MediaId(parentId.id))

            case LikeTypes.Review:
                likeParent = await getReview(new ReviewId(parentId.id))
        }

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
