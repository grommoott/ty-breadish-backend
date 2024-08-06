import { LikeType } from "@enums"
import { Id, LikeId, UserId } from "@primitives"


/** Interface for BDLike 
 *
 * id: LikeId
 * from: UserId
 * target: MediaId
 * type: LikeType
 * */
interface IBDLike {
    id: LikeId,
    from: UserId,
    target: Id,
    type: LikeType
}

/** Interface for Like
 * 
 * id: LikeId
 * from: UserId
 * target: MediaId
 * type: LikeType
 * */
interface ILike {
    id: LikeId,
    from: UserId,
    target: Id,
    type: LikeType
}

export { IBDLike, ILike }
