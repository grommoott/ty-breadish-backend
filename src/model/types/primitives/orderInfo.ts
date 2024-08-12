import { isInEnum } from "@helpers"
import { CourierOrderState, PickUpOrderState, PickUpOrderStates } from "../enums/orderInfo"

interface PickUpOrderInfo {
    bakeryAddress: string,
    state: PickUpOrderState
}

interface CourierOrderInfo {
    bakeryAddress: string,
    deliveryAddress: string,
    state: CourierOrderState
}

function isOrderInfoIsPickUpOrderInfo(orderInfo: OrderInfo): orderInfo is PickUpOrderInfo {
    return typeof (orderInfo as PickUpOrderInfo)?.bakeryAddress === "string" &&
        isInEnum(PickUpOrderStates, (orderInfo as PickUpOrderInfo)?.state)
}

function isOrderInfoIsCourierOrderInfo(orderInfo: OrderInfo): orderInfo is CourierOrderInfo {
    return typeof (orderInfo as CourierOrderInfo)?.bakeryAddress === "string" &&
        typeof (orderInfo as CourierOrderInfo)?.deliveryAddress === "string" &&
        isInEnum(PickUpOrderStates, (orderInfo as PickUpOrderInfo)?.state)
}

type OrderInfo = PickUpOrderInfo | CourierOrderInfo

export { PickUpOrderInfo, CourierOrderInfo, isOrderInfoIsPickUpOrderInfo, isOrderInfoIsCourierOrderInfo, OrderInfo }
