import { IOrder, IUser, queryRowsToOrder } from "@interfaces";
import { UserId } from "@primitives";
import getUser from "./getUser";
import { QueryResult } from "pg";
import bdClient from "@api/bdClient";

export default async function getUserOrders(userId: UserId): Promise<Array<IOrder> | Error> {
    try {
        const userWithId: IUser | Error = await getUser(userId)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const orders: QueryResult = await bdClient.query(`select * from orders where "from"=${userId}`)

        const resultPromises = orders.rows.map(async orderRow => {
            const productIds = await bdClient.query(`select * from order_products_ids where order=${orderRow.id}`)

            return queryRowsToOrder(orderRow, productIds.rows)
        })

        await Promise.all(resultPromises)

        const result: Array<IOrder> = new Array<IOrder>()

        resultPromises.forEach(orderPromise => orderPromise.then(order => result.push(order)))

        await Promise.resolve()

        return result
    } catch (e) {
        const msg = "Error in getUserOrders request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
