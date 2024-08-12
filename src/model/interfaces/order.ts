import { OrderType, OrderTypes } from "@enums";
import { Moment, OrderId, ProductId, UserId } from "@primitives";
import { OrderInfo } from "model/types/primitives/orderInfo";

interface IOrder {
    id: OrderId,
    from: UserId,
    paymentId: string,
    moment: Moment,
    orderType: OrderType,
    orderInfo: OrderInfo,
    productIds: Array<ProductId>
}

function queryRowsToOrder(orderRow: any, productsRows: Array<any>): IOrder {
    if (!(
        "id" in orderRow &&
        "from" in orderRow &&
        "payment_id" in orderRow &&
        "moment" in orderRow &&
        "order_type" in orderRow &&
        "order_info" in orderRow &&
        "address" in orderRow.orderInfo &&
        "state" in orderRow.orderInfo
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
                bakeryAddress: orderRow.order_info.bakeryAddress,
                state: orderRow.order_info.state
            }

        case OrderTypes.PickUp:
            orderInfo = {
                bakeryAddress: orderRow.order_info.bakeryAddress,
                deliveryAddress: orderRow.order_info.deliveryAddress,
                state: orderRow.order_info.state
            }
    }

    return {
        id: new OrderId(orderRow.id),
        from: new UserId(orderRow.from),
        paymentId: orderRow.payment_id,
        moment: new Moment(orderRow.moment),
        orderType,
        orderInfo,
        productIds: productsRows.map(row => new ProductId(row.product))
    }
}

export { IOrder, queryRowsToOrder }
