import { isInEnum } from "@helpers"
import { CourierOrderState, CourierOrderStates, PickUpOrderState, PickUpOrderStates } from "../enums/orderInfo"
import { BakeryId } from "./id"

interface PickUpOrderInfo {
    bakeryId: BakeryId,
    state: PickUpOrderState,
    productCounts: { [id: number]: number }
}

interface CourierOrderInfo {
    bakeryId: BakeryId,
    deliveryAddress: string,
    state: CourierOrderState,
    productCounts: { [id: number]: number }
}

type OrderInfo = PickUpOrderInfo | CourierOrderInfo

function orderInfoToNormalView(orderInfo: OrderInfo) {
    const id = (orderInfo.bakeryId as any)._id
    console.log("id:", id)
    const tmp = { ...orderInfo } as any
    console.log("tmp1:", tmp)
    tmp.bakeryId = id
    console.log("tmp2:", tmp)
    return tmp
}

function isOrderInfoIsPickUpOrderInfo(orderInfo: OrderInfo): orderInfo is PickUpOrderInfo {
    return isInEnum(PickUpOrderStates, (orderInfo as PickUpOrderInfo)?.state)
}

function isOrderInfoIsCourierOrderInfo(orderInfo: OrderInfo): orderInfo is CourierOrderInfo {
    return typeof (orderInfo as CourierOrderInfo)?.deliveryAddress === "string" &&
        isInEnum(CourierOrderStates, (orderInfo as CourierOrderInfo)?.state)
}

export { PickUpOrderInfo, CourierOrderInfo, isOrderInfoIsPickUpOrderInfo, isOrderInfoIsCourierOrderInfo, OrderInfo, orderInfoToNormalView }
