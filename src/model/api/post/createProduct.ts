import bdClient from "@api/bdClient";
import { IBDProduct } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function createProduct(name: string, description: string, price: Price, itemInfo: ItemInfo): Promise<IBDProduct | Error> {
    try {
        const response: QueryResult = await bdClient.query(`insert into products values (default, nextval('item_id'), '${name}', '${description}' ${price}, -1, '${itemInfo.toJSON()}') returning *`)
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
