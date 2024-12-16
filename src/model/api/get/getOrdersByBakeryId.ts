import bdClient from "@api/bdClient";
import { IOrder, queryRowsToOrder } from "@interfaces";
import { BakeryId } from "@primitives";
import { QueryResult } from "pg";

export default async function getOrdersByBakeryId(id: BakeryId): Promise<Array<IOrder> | Error> {
    try {
        const orders: QueryResult = await bdClient.query(`select * from orders where order_info -> 'bakeryId'='${id}'`)

        const resultPromises = orders.rows.map(async (orderRow) => {
            const result = await bdClient.query(`select * from order_products_ids where "order"=${orderRow.id}`)

            return queryRowsToOrder(orderRow, result.rows)
        })

        await Promise.all(resultPromises)

        const result = new Array()

        resultPromises.forEach((promise) => promise.then((order) => {
            result.push(order)
        }))

        await Promise.resolve()

        return result
    } catch (e) {
        const msg = "Error in getOrdersByBakeryId request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
