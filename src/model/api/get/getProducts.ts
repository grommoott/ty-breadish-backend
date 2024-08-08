import bdClient from "@api/bdClient";
import { IProduct, queryRowToProduct } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function getProducts(): Promise<Array<IProduct>> {
    try {
        const response: QueryResult = await bdClient.query("select * from products")

        return response.rows.map(queryRowToProduct)
    } catch (e) {
        const msg = "Error in getProducts request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
