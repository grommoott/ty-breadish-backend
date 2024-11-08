import deleteOrder from "@api/delete/deleteOrder"
import getOrder from "@api/get/getOrder"
import createOrder from "@api/post/createOrder"
import updateOrder from "@api/put/updateOrder"
import { OrderType, PaymentStatus } from "@enums"
import { IOrder } from "@interfaces"
import { BakeryId, Moment, OrderId, Price, ProductId, UserId } from "@primitives"
import { OrderInfo } from "model/types/primitives/orderInfo"
import { Entity } from "./entity"
import getUserOrders from "@api/get/getUserOrders"
import getOrderByPaymentId from "@api/get/getOrderByPaymentId"
import { Product } from "./product"
import getOrdersByBakeryId from "@api/get/getOrdersByBakeryId"

class Order extends Entity {

    // Private fields

    private _order: IOrder
    private _products: Array<Product> | undefined
    private _price: Price | undefined

    // Getters

    public get id(): OrderId {
        return this._order.id
    }

    public get from(): UserId {
        return this._order.from
    }

    public get paymentId(): string {
        return this._order.paymentId
    }

    public get paymentStatus(): string {
        return this._order.paymentStatus
    }

    public get moment(): Moment {
        return this._order.moment
    }

    public get orderType(): OrderType {
        return this._order.orderType
    }

    public get orderInfo(): OrderInfo {
        return this._order.orderInfo
    }

    public get productIds(): Array<ProductId> {
        return this._order.productIds
    }

    // Methods

    public async getProducts(): Promise<Array<Product>> {
        if (!this._products) {
            this._products = new Array<Product>()

            const productPromises = this._order.productIds.map(async productId => await Product.fromId(productId))

            await Promise.all(productPromises)

            productPromises.forEach(productPromise => productPromise.then(product => {
                if (product instanceof Error) {
                    return
                }

                this._products?.push(product)
            }))

            await Promise.resolve()
        }

        return this._products
    }

    public async getPrice(): Promise<Price> {
        if (!this._price) {
            const products: Array<Product> = await this.getProducts()

            this._price = new Price(products.map(product => product.price.price).reduce((acc, cur) => acc + cur))
        }

        return this._price
    }


    public async edit<T extends OrderInfo>(data: { paymentStatus?: PaymentStatus, orderType?: OrderType, orderInfo?: T, readyMoment?: Moment }): Promise<void | Error> {
        return await updateOrder(this._order.id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteOrder(this._order.id)
    }

    // Static constructors

    public static async fromId(id: OrderId): Promise<Order | Error> {
        const order: IOrder | Error = await getOrder(id)

        if (order instanceof Error) {
            return order
        }

        return new Order(order)
    }

    public static async fromPaymentId(paymentId: string): Promise<Order | Error> {
        const order: IOrder | Error = await getOrderByPaymentId(paymentId)

        if (order instanceof Error) {
            return order
        }

        return new Order(order)
    }

    public static async fromBakeryId(id: BakeryId): Promise<Array<Order> | Error> {
        const response: Array<IOrder> | Error = await getOrdersByBakeryId(id)

        if (response instanceof Error) {
            return response
        }

        return response.map(order => new Order(order))
    }

    public static async fromUser(id: UserId): Promise<Array<Order> | Error> {
        const orders: Array<IOrder> | Error = await getUserOrders(id)

        if (orders instanceof Error) {
            return orders
        }

        return orders.map(order => new Order(order))
    }

    public static async create({ from, paymentId, orderType, orderInfo, productIds }: { from: UserId, paymentId: string, orderType: OrderType, orderInfo: OrderInfo, productIds: Array<ProductId> }): Promise<Order | Error> {
        const order: IOrder | Error = await createOrder(from, paymentId, orderType, orderInfo, productIds)

        if (order instanceof Error) {
            return order
        }

        return new Order(order)
    }

    public override toNormalView(): object {
        return {
            id: this._order.id.id,
            from: this._order.from.id,
            moment: this._order.moment.moment,
            orderType: this._order.orderType,
            orderInfo: this._order.orderInfo,
            productIds: this._order.productIds.map(productId => productId.id),
            readyMoment: this._order.readyMoment.moment
        }
    }

    protected constructor({ id, from, paymentId, paymentStatus, moment, orderType, orderInfo, productIds, readyMoment }: IOrder) {
        super()

        this._order = { id, from, paymentId, paymentStatus, moment, orderType, orderInfo, productIds, readyMoment }
    }
}

export { Order }
