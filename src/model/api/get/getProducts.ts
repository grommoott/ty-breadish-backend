import bdClient from "@api/bdClient";
import { IBDProduct } from "@interfaces/product";
import { AvgRate, ItemId, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function getProducts(): Promise<Array<IBDProduct> | Error> {
    try {
        const response: QueryResult = await bdClient.query("select * from products")

        return response.rows.map(product => {
            return {
                id: new ProductId(product.id),
                itemId: new ItemId(product.item_id),
                name: product.name,
                price: new Price(product.price),
                avgRate: new AvgRate(product.avg_rate)
            }
        })
    } catch (e) {
        const msg = "Error in getProducts request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
