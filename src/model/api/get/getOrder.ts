import bdClient from "@api/bdClient";
import { IOrder, queryRowsToOrder } from "@interfaces";
import { OrderId } from "@primitives";
import { QueryResult } from "pg";

export default async function getOrder(id: OrderId): Promise<IOrder | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from orders where id=${id}`)

        if (response.rowCount == 0) {
            return new Error(`Order with such id(${id}) isn't exists`)
        }

        const order = response.rows[0]

        const products = await bdClient.query(`select * from order_products_ids where "order"=${order.id}`)

        return queryRowsToOrder(order, products.rows)
    } catch (e) {
        const msg = "Error in getOrder request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
