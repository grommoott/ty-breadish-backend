import { LikeType } from "@enums"
import { Id, LikeId, UserId } from "@primitives"

interface IBDLike {
    id: LikeId,
    from: UserId,
    target: Id,
    type: LikeType
}

interface ILike extends IBDLike { }

export { IBDLike, ILike }
