import bdClient from "@api/bdClient";
import getOrder from "@api/get/getOrder";
import { OrderType, OrderTypes } from "@enums";
import { isEmpty } from "@helpers";
import { IOrder } from "@interfaces";
import { IBDPrimitive, isOrderInfoIsCourierOrderInfo, isOrderInfoIsPickUpOrderInfo, Moment, OrderId, OrderInfo } from "@primitives";

export default async function updateOrder(id: OrderId, data: { orderType?: OrderType, orderInfo?: OrderInfo, readyMoment?: Moment }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const orderWithId: IOrder | Error = await getOrder(id)

        if (orderWithId instanceof Error) {
            return orderWithId
        }

        if (data.orderInfo) {
            const newOrderType: OrderType = (() => {
                if (data.orderType) {
                    return data.orderType
                } else {
                    return orderWithId.orderType
                }
            })()

            switch (newOrderType) {
                case OrderTypes.Courier:
                    if (isOrderInfoIsPickUpOrderInfo(data.orderInfo)) {
                        throw new Error("Expected CourierOrderInfo but got PickUpOrderInfo")
                    }

                case OrderTypes.PickUp:
                    if (isOrderInfoIsCourierOrderInfo(data.orderInfo)) {
                        throw new Error("Expected PickUpOrderInfo but got CourierOrderInfo")
                    }
            }
        }

        const nameConverter: (name: string) => string = (name: string): string => {
            switch (name) {
                case "orderType":
                    return "order_type"

                case "orderInfo":
                    return "order_info"

                case "readyMoment":
                    return "ready_moment"

                default:
                    return name
            }
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            switch (key) {
                case "orderInfo":
                    return `'${JSON.stringify(value)}'`

                case "readyMoment":
                    return `${(value as IBDPrimitive).toBDView()}`

                default:
                    return `'${value}'`
            }
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`
        }).join(", ")

        await bdClient.query(`update orders set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateOrder request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
