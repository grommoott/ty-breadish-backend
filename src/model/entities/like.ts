import deleteLike from "@api/delete/deleteLike"
import getLike from "@api/get/getLike"
import { LikeType } from "@enums"
import { ILike } from "@interfaces"
import { Id, LikeId, UserId } from "@primitives"

class Like {

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

    private constructor({ id, from, target, type }: ILike) {
        this._like = { id, from, target, type }
    }
}

export { Like }
