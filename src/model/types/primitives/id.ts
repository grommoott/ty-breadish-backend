import { IBDPrimitive } from "./bdPrimitive"

class Id implements IBDPrimitive {
    private _id: number

    public get id(): number {
        return this._id
    }

    public toString(): string {
        return this._id.toString()
    }

    public toBDView(): string {
        return this._id.toString()
    }

    public serialize(): string {
        return this._id.toString()
    }

    public constructor(id: number | string) {
        if (typeof id === "string") {
            id = parseInt(id)
        }

        let isValid = true

        isValid = isValid && Math.round(id) - id == 0
        isValid = isValid && id >= 0

        if (!isValid) {
            throw new Error(`Invalid id(${id})`)
        }

        this._id = id
    }
}

class CommentId extends Id {
    private _: CommentId | null = null
}

class FeaturedId extends Id {
    private _: FeaturedId | null = null
}

class LikeId extends Id {
    private _: LikeId | null = null
}

class NewId extends Id {
    private _: NewId | null = null
}

class ProductId extends Id {
    private _: ProductId | null = null
}

class RecipeId extends Id {
    private _: RecipeId | null = null
}

class ReviewId extends Id {
    private _: ReviewId | null = null
}

class UserId extends Id {
    private _: UserId | null = null
}

class MediaId extends Id {
    private _: MediaId | null = null
}

class ItemId extends Id {
    private _: ItemId | null = null
}

class OrderId extends Id {
    private _: OrderId | null = null
}

class SessionId extends Id {
    private _: SessionId | null = null
}

class ImageId extends Id {
    private _: ImageId | null = null
}

class BakeryId extends Id {
    private _: BakeryId | null = null
}

export {
    Id,
    CommentId,
    FeaturedId,
    LikeId,
    NewId,
    ProductId,
    RecipeId,
    ReviewId,
    UserId,
    MediaId,
    ItemId,
    OrderId,
    SessionId,
    ImageId,
    BakeryId
}
