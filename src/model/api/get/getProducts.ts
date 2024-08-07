import bdClient from "@api/bdClient";
import { IBDProduct } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function getProducts(): Promise<Array<IBDProduct>> {
    try {
        const response: QueryResult = await bdClient.query("select * from products")

        return response.rows.map(product => {
            return {
                id: new ProductId(product.id),
                itemId: new ItemId(product.item_id),
                name: product.name,
                description: product.description,
                price: new Price(product.price),
                avgRate: new AvgRate(product.avg_rate),
                itemInfo: ItemInfo.fromJSON(product.item_info)
            }
        })
    } catch (e) {
        const msg = "Error in getProducts request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
