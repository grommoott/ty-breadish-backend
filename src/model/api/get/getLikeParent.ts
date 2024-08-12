import { LikeType, LikeTypes } from "@enums";
import { IItem, IMedia, IReview } from "@interfaces";
import { Id, ItemId, MediaId, ReviewId } from "@primitives";
import getItem from "./getItem";
import getMedia from "./getMedia";
import getReview from "./getReview";

export default async function getLikeParent(target: Id, type: LikeType): Promise<IItem | IMedia | IReview | Error> {
    try {
        let likeParent

        switch (type) {
            case LikeTypes.Item:
                likeParent = await getItem(new ItemId(target.id))

            case LikeTypes.Media:
                likeParent = await getMedia(new MediaId(target.id))

            case LikeTypes.Review:
                likeParent = await getReview(new ReviewId(target.id))
        }

        return likeParent
    } catch (e) {
        const msg = "Error in getLikeParent request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
