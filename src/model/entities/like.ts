import deleteLike from "@api/delete/deleteLike"
import getLike from "@api/get/getLike"
import getUserLiked from "@api/get/getUserLiked"
import createLike from "@api/post/createLike"
import { LikeType } from "@enums"
import { ILike } from "@interfaces"
import { Id, LikeId, UserId } from "@primitives"
import { Entity } from "./entity"

class Like extends Entity {

    // Private fields

    private _like: ILike

    // Getters

    public get id(): LikeId {
        return this._like.id
    }

    public get from(): UserId {
        return this._like.from
    }

    public get target(): Id {
        return this._like.target
    }

    public get type(): LikeType {
        return this._like.type
    }

    // Methods

    public async delete(): Promise<boolean | Error> {
        return deleteLike(this._like.id)
    }

    // Static constructors

    public static async fromId(id: LikeId): Promise<Like | Error> {
        const like: ILike | Error = await getLike(id)

        if (like instanceof Error) {
            return like
        }

        return new Like(like)
    }

    public static async fromUser(id: UserId): Promise<Array<Like> | Error> {
        const likes: Array<ILike> | Error = await getUserLiked(id)

        if (likes instanceof Error) {
            return likes
        }

        return likes.map(like => new Like(like))
    }

    public static async create(from: UserId, target: Id, type: LikeType): Promise<Like | Error> {
        const like: ILike | Error = await createLike(from, target, type)

        if (like instanceof Error) {
            return like
        }

        return new Like(like)
    }

    public serialize(): string {
        return JSON.stringify({
            id: this._like.id.id,
            from: this._like.from.id,
            target: this._like.target.id,
            type: this._like.type
        })
    }

    private constructor({ id, from, target, type }: ILike) {
        super()

        this._like = { id, from, target, type }
    }
}

export { Like }
