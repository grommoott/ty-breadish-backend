import bdClient from "@api/bdClient";
import getProduct from "@api/get/getProduct";
import getUser from "@api/get/getUser";
import { OrderType } from "@enums";
import { IOrder, IProduct, IUser, queryRowsToOrder } from "@interfaces";
import { Moment, ProductId, UserId } from "@primitives";
import { OrderInfo } from "model/types/primitives/orderInfo";
import { QueryResult } from "pg";

export default async function createOrder(from: UserId, orderType: OrderType, orderInfo: OrderInfo, products: Array<ProductId>, _moment: Moment | null = null): Promise<IOrder | Error> {
    try {
        const userWithId: IUser | Error = await getUser(from)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const moment: Moment = (() => {
            if (_moment === null) {
                return Moment.now()
            } else {
                return _moment
            }
        })()

        const productsWithIdPromises: Array<Promise<IProduct | Error>> = products.map(async productId => {
            return await getProduct(productId)
        })

        await Promise.all(productsWithIdPromises)

        const productsWithId: Array<IProduct | Error> = new Array()

        productsWithIdPromises.forEach(productPromise => productPromise.then((product) => productsWithId.push(product)))

        await Promise.resolve()

        for (let product of productsWithId) {
            if (product instanceof Error) {
                return product
            }
        }

        const paymentId = "payment_id" // get it from yookassa

        const responseOrders: QueryResult = await bdClient.query(`insert into orders values (default, ${from}, '${paymentId}', ${moment}, '${orderType}', '${JSON.stringify(orderInfo)}') returning *`)
        const order = responseOrders.rows[0]

        const responseProducts: QueryResult = await bdClient.query(`insert into order_products_ids values ${products.map(productId => `(default, ${order.id}, ${productId})`).join(", ")} returning *`)

        return queryRowsToOrder(responseOrders.rows[0], responseProducts.rows)
    } catch (e) {
        const msg = "Error in createOrder request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
