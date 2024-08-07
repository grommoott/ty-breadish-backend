import bdClient from "@api/bdClient";
import { IBDProduct } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function createProduct(name: string, description: string, price: Price, itemInfo: ItemInfo, id: ProductId | null = null): Promise<IBDProduct | Error> {
    try {
        const _id: ProductId | string = (() => {
            if (id === null) {
                return "((select id from products orber by id desc limit 1) + 1)"
            } else {
                return id
            }
        })()

        const _itemId: ItemId | string = (() => {
            if (id === null) {
                return (_id as string)
            } else {
                return new ItemId((_id as ProductId).id)
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into products values (${_id}, ${_itemId}, '${name}', '${description}' ${price}, -1, '${itemInfo.toJSON()}') returning *`)
        const product = response.rows[0]

        return {
            id: new ProductId(product.id),
            itemId: new ItemId(product.item_id),
            name: product.name,
            description: product.description,
            price: new Price(product.price),
            avgRate: new AvgRate(product.avg_rate),
            itemInfo: ItemInfo.fromJSON(product.item_info)
        }
    } catch (e) {
        const msg = "Error in createProduct request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
