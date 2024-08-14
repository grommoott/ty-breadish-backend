import bdClient from "@api/bdClient";
import { pgFormat } from "@helpers";
import { IProduct, queryRowToProduct } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function createProduct(name: string, description: string, price: Price, itemInfo: ItemInfo): Promise<IProduct> {
    try {
        const response: QueryResult = await bdClient.query(`insert into products values (default, nextval('item_id'), '${pgFormat(name)}', '${pgFormat(description)}' ${price}, -1, '${itemInfo.toJSON()}') returning *`)

        return queryRowToProduct(response.rows[0])
    } catch (e) {
        const msg = "Error in createProduct request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
