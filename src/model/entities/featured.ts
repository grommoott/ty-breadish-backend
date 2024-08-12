import deleteFeatured from "@api/delete/deleteFeatured"
import getFeatured from "@api/get/getFeatured"
import getUserFeatured from "@api/get/getUserFeatured"
import createFeatured from "@api/post/createFeatured"
import { ItemType } from "@enums"
import { IFeatured } from "@interfaces"
import { FeaturedId, ItemId, UserId } from "@primitives"

class Featured {

    // Private fields

    private _featured: IFeatured

    // Getters

    public get id(): FeaturedId {
        return this._featured.id
    }

    public get from(): UserId {
        return this._featured.from
    }

    public get target(): ItemId {
        return this._featured.target
    }

    public get itemType(): ItemType {
        return this._featured.itemType
    }

    // Methods

    public async delete(): Promise<boolean | Error> {
        return await deleteFeatured(this._featured.id)
    }

    // Static constructors

    public static async fromId(id: FeaturedId): Promise<Featured | Error> {
        const featured: IFeatured | Error = await getFeatured(id)

        if (featured instanceof Error) {
            return featured
        }

        return new Featured(featured)
    }

    public static async fromUser(id: UserId): Promise<Array<Featured> | Error> {
        const featured: Array<IFeatured> | Error = await getUserFeatured(id)

        if (featured instanceof Error) {
            return featured
        }

        return featured.map(featured => new Featured(featured))
    }

    public static async create(from: UserId, target: ItemId, itemType: ItemType): Promise<Featured | Error> {
        const featured: IFeatured | Error = await createFeatured(from, target, itemType)

        if (featured instanceof Error) {
            return featured
        }

        return new Featured(featured)
    }

    private constructor({ id, from, target, itemType }: IFeatured) {
        this._featured = { id, from, target, itemType }
    }
}

export { Featured }
