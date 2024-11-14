import bdClient from "@api/bdClient";
import getItem from "@api/get/getItem";
import { IItem, isItemIsProduct, isItemIsRecipe } from "@interfaces";
import { ItemId } from "@primitives";

export default async function updateItemRate(itemId: ItemId): Promise<void | Error> {
    try {
        const item: IItem | Error = await getItem(itemId)

        if (item instanceof Error) {
            return item
        }

        if (isItemIsRecipe(item)) {
            await bdClient.query(`update recipes set avg_rate=(select avg(cast(cast(rate as text) as integer)) from reviews where target=${itemId}) where item_id=${itemId}`)
            return
        }

        if (isItemIsProduct(item)) {
            await bdClient.query(`update products set avg_rate=(select avg(cast(cast(rate as text) as integer)) from reviews where target=${itemId}) where item_id=${itemId}`)
            return
        }

        return new Error(`Item with such itemId(${itemId}) isn't exists`)
    } catch (e) {
        const msg = "Error in updateItemRate request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
