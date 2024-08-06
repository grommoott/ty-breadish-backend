import { ItemType } from "@enums"
import { FeaturedId, ItemId, UserId } from "@primitives"

/** Interface for BDFeatured
 * 
 * id: FeaturedId 
 * from: UserId
 * target: ItemId
 * itemType: ItemType
 * */
interface IBDFeatured {
    id: FeaturedId,
    from: UserId,
    target: ItemId,
    itemType: ItemType
}

/** Interface for Featured
 * 
 * id: FeaturedId
 * from: UserId
 * target: ItemId 
 * itemType: ItemType
 * */
interface IFeatured {
    id: FeaturedId,
    from: UserId,
    target: ItemId,
    itemType: ItemType
}

export { IBDFeatured, IFeatured }
