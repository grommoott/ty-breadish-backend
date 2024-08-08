import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives"
import { IItem } from "./item"

interface IProduct extends IItem {
    id: ProductId,
    price: Price,
}

function isItemIsProduct(item: IItem): item is IProduct {
    return (item as IProduct)?.id instanceof ProductId &&
        (item as IProduct)?.id instanceof Price
}

function queryRowToProduct(row: any): IProduct {
    if (!("id" in row &&
        "price" in row &&
        "item_id" in row &&
        "name" in row &&
        "description" in row &&
        "avg_rate" in row &&
        "item_info" in row)) {
        throw new Error("Invalid query row to convert into IProduct")
    }

    return {
        id: new ProductId(row.id),
        price: new Price(row.price),
        itemId: new ItemId(row.item_id),
        name: row.name,
        description: row.description,
        avgRate: new AvgRate(row.avg_rate),
        itemInfo: ItemInfo.fromJSON(row.item_info)
    }
}

export { IProduct, isItemIsProduct, queryRowToProduct } 
