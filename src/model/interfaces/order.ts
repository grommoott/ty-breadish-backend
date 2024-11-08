import { OrderType, OrderTypes, PaymentStatus } from "@enums";
import { BakeryId, Moment, OrderId, ProductId, UserId } from "@primitives";
import { OrderInfo } from "model/types/primitives/orderInfo";

interface IOrder {
    id: OrderId,
    from: UserId,
    paymentId: string,
    paymentStatus: PaymentStatus,
    moment: Moment,
    orderType: OrderType,
    orderInfo: OrderInfo,
    productIds: Array<ProductId>,
    readyMoment: Moment
}

function queryRowsToOrder(orderRow: any, productsRows: Array<any>): IOrder {
    if (!(
        "id" in orderRow &&
        "from" in orderRow &&
        "payment_id" in orderRow &&
        "payment_status" in orderRow &&
        "moment" in orderRow &&
        "order_type" in orderRow &&
        "order_info" in orderRow &&
        "address" in orderRow.orderInfo &&
        "state" in orderRow.orderInfo &&
        "ready_moment" in orderRow
    )) {
        throw new Error("Invalid order row to convert into Order")
    }

    productsRows.forEach(row => {
        if (!(
            "order" in row &&
            "product" in row
        )) {
            throw new Error("Invalid products rows to convert into Order")
        }

        if (!row.order === orderRow.id) {
            throw new Error("Invalid products rows to convert into Order")
        }
    })

    const orderType: OrderType = orderRow.order_type
    let orderInfo: OrderInfo

    switch (orderType) {
        case OrderTypes.Courier:
            orderInfo = {
                bakeryId: new BakeryId(orderRow.order_info.bakeryId),
                state: orderRow.order_info.state,
                productCounts: orderRow.order_info.productCounts
            }

        case OrderTypes.PickUp:
            orderInfo = {
                bakeryId: new BakeryId(orderRow.order_info.bakeryId),
                deliveryAddress: orderRow.order_info.deliveryAddress,
                state: orderRow.order_info.state,
                productCounts: orderRow.order_info.productCounts
            }
    }

    return {
        id: new OrderId(orderRow.id),
        from: new UserId(orderRow.from),
        paymentId: orderRow.payment_id,
        paymentStatus: orderRow.payment_status,
        moment: new Moment(orderRow.moment),
        orderType,
        orderInfo,
        productIds: productsRows.map(row => new ProductId(row.product)),
        readyMoment: new Moment(orderRow.ready_moment)
    }
}

export { IOrder, queryRowsToOrder }
