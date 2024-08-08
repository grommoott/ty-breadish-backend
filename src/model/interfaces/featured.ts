import { ItemType } from "@enums"
import { FeaturedId, ItemId, UserId } from "@primitives"

interface IFeatured {
    id: FeaturedId,
    from: UserId,
    target: ItemId,
    itemType: ItemType
}

function queryRowToFeatured(row: any): IFeatured {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "item_type" in row)) {
        throw new Error("Invalid query row to convert into IFeatured")
    }

    return {
        id: new FeaturedId(row.id),
        from: new UserId(row.from),
        target: new ItemId(row.target),
        itemType: row.item_type
    }
}

export { IFeatured, queryRowToFeatured }
