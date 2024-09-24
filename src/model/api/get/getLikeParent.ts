import { LikeType, LikeTypes } from "@enums";
import { IMedia, IReview } from "@interfaces";
import { Id, MediaId, ReviewId } from "@primitives";
import getMedia from "./getMedia";
import getReview from "./getReview";

export default async function getLikeParent(target: Id, type: LikeType): Promise<IMedia | IReview | Error> {
    try {
        let likeParent

        switch (type) {
            case LikeTypes.Media:
                likeParent = await getMedia(new MediaId(target.id))
                break

            case LikeTypes.Review:
                likeParent = await getReview(new ReviewId(target.id))
                break
        }

        return likeParent
    } catch (e) {
        const msg = "Error in getLikeParent request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
