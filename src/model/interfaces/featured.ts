import { ItemType } from "@enums"
import { FeaturedId, ItemId, UserId } from "@primitives"

interface IBDFeatured {
    id: FeaturedId,
    from: UserId,
    target: ItemId,
    itemType: ItemType
}

interface IFeatured extends IBDFeatured { }

export { IBDFeatured, IFeatured }
