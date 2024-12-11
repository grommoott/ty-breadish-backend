import bdClient from "@api/bdClient"
import { IOrder, queryRowsToOrder } from "@interfaces"
import { QueryResult } from "pg"

export default async function getOrderByPaymentId(paymentId: string): Promise<IOrder | Error> {
    try {
        const orders: QueryResult = await bdClient.query(`select * from orders where payment_id='${paymentId}'`)

        if (orders.rowCount == 0) {
            return new Error(`Order with such payment id(${paymentId}) isn't found`)
        }

        const order = orders.rows[0]

        const products: QueryResult = await bdClient.query(`select * from order_products_ids where "order"=${order.id}`)

        return queryRowsToOrder(order, products.rows)
    } catch (e) {
        const msg = "Error in getOrderByPaymentId request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
