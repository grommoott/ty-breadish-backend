import { deleteOrder } from "@api/delete/deleteOrder"
import getOrder from "@api/get/getOrder"
import createOrder from "@api/post/createOrder"
import updateOrder from "@api/put/updateOrder"
import { OrderType, OrderTypes } from "@enums"
import { IOrder } from "@interfaces"
import { Moment, OrderId, ProductId, UserId } from "@primitives"
import { CourierOrderInfo, OrderInfo, PickUpOrderInfo } from "model/types/primitives/orderInfo"

class Order {

    // Private fields

    private _order: IOrder

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

    public async edit(data: { orderType?: OrderType, orderInfo?: OrderInfo }): Promise<void | Error> {
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

    public static async create({ from, orderType, orderInfo, productIds }: { from: UserId, orderType: OrderType, orderInfo: OrderInfo, productIds: Array<ProductId> }): Promise<Order | Error> {
        const order: IOrder | Error = await createOrder(from, orderType, orderInfo, productIds)

        if (order instanceof Error) {
            return order
        }

        return new Order(order)
    }

    protected constructor({ id, from, paymentId, moment, orderType, orderInfo, productIds }: IOrder) {
        this._order = { id, from, paymentId, moment, orderType, orderInfo, productIds }
    }
}

export { Order }
