import { Order, Product, User } from "@entities"
import { OrderType, OrderTypes } from "@enums"
import { asyncErrorCatcher, isInEnum } from "@helpers"
import { Payment, yookassaApi } from "@helpers/yookassa"
import { checkAuthorized, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { OrderId, OrderInfo, Price, ProductId, UserId } from "@primitives"
import { maxPaymentDescriptionSize } from "./config"

class Orders {
    public get: Array<Middleware> = [
        checkAuthorized,
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const orders: Array<Order> | Error = await user.getOrders()

            if (orders instanceof Error) {
                next(orders)
                return
            }

            res.send(orders.map(order => order.toNormalView()))

            next()
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["orderType", "orderInfo", "productIds"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const orderType: OrderType = req.body.orderType
            const orderInfo: OrderInfo = req.body.orderInfo
            const productIds: Array<ProductId> = req.body.productIds.map((productId: number) => new ProductId(productId))

            if (!isInEnum(OrderTypes, orderType)) {
                next(new Error("Invalid request!", { cause: 400 }))
                return
            }

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const productPromises: Array<Promise<Product | Error>> = productIds.map(async productId => {
                return await Product.fromId(productId)
            })

            await Promise.all(productPromises)

            let error: Error | object = new Object()
            let prices: Array<number> = new Array<number>()
            let names: Array<string> = new Array<string>()

            productPromises.forEach(productPromise => productPromise.then(product => {
                if (product instanceof Error) {
                    error = product
                } else {
                    if (error instanceof Error) {
                        return error
                    }

                    const count = orderInfo.productCounts[product.id.id]

                    if (count > 0) {
                        prices.push(product.price.price * count)
                        names.push(product.name)
                    }
                }
            }))

            await Promise.resolve()

            if (error instanceof Error) {
                next(error)
                return
            }

            const price: Price = new Price(prices.reduce((acc, cur) => acc + cur))
            const description: string = (() => {
                let builder: string = ""

                for (const name of names) {
                    const tmp = builder + name

                    if (tmp.length > maxPaymentDescriptionSize - 7) {
                        builder += " и т.д."
                        break
                    } else if (tmp.length > maxPaymentDescriptionSize - 7) {
                        builder = tmp
                        break
                    }

                    builder = tmp
                }



                return builder
            })()

            const payment: Payment | Error = await yookassaApi.createPayment(price, description, "https://example.com")

            if (payment instanceof Error) {
                next(payment)
                return
            }

            const order: Order | Error = await user.createOrder(payment.id, orderType, orderInfo, productIds)

            if (order instanceof Error) {
                next(order)
                return
            }

            res.send(order.toNormalView())

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAuthorized,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)
            const id: OrderId = new OrderId(req.params.id)

            const order: Order | Error = await Order.fromId(id)

            if (order instanceof Error) {
                next(order)
                return
            }

            if (from.id !== order.from.id) {
                next(new Error("Forbidden!", { cause: 403 }))
                return
            }

            const refund: boolean | Error = await yookassaApi.refundPayment(await order.getPrice(), order.paymentId)

            if (refund instanceof Error) {
                next(refund)
                return
            }

            if (!refund) {
                next(new Error("Error! Try again later, sorry for the inconvinience", { cause: 500 }))
                return
            }

            res.sendStatus(200)

            next()
        })
    ]
}

export default new Orders()
