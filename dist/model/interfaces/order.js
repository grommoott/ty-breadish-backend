"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowsToOrder = queryRowsToOrder;
const _enums_1 = require("@enums");
const _primitives_1 = require("@primitives");
function queryRowsToOrder(orderRow, productsRows) {
    if (!("id" in orderRow &&
        "from" in orderRow &&
        "payment_id" in orderRow &&
        "payment_status" in orderRow &&
        "moment" in orderRow &&
        "order_type" in orderRow &&
        "order_info" in orderRow &&
        "address" in orderRow.orderInfo &&
        "state" in orderRow.orderInfo &&
        "ready_moment" in orderRow)) {
        throw new Error("Invalid order row to convert into Order");
    }
    productsRows.forEach(row => {
        if (!("order" in row &&
            "product" in row)) {
            throw new Error("Invalid products rows to convert into Order");
        }
        if (!row.order === orderRow.id) {
            throw new Error("Invalid products rows to convert into Order");
        }
    });
    const orderType = orderRow.order_type;
    let orderInfo;
    switch (orderType) {
        case _enums_1.OrderTypes.Courier:
            orderInfo = {
                bakeryAddress: orderRow.order_info.bakeryAddress,
                state: orderRow.order_info.state
            };
        case _enums_1.OrderTypes.PickUp:
            orderInfo = {
                bakeryAddress: orderRow.order_info.bakeryAddress,
                deliveryAddress: orderRow.order_info.deliveryAddress,
                state: orderRow.order_info.state
            };
    }
    return {
        id: new _primitives_1.OrderId(orderRow.id),
        from: new _primitives_1.UserId(orderRow.from),
        paymentId: orderRow.payment_id,
        paymentStatus: orderRow.payment_status,
        moment: new _primitives_1.Moment(orderRow.moment),
        orderType,
        orderInfo,
        productIds: productsRows.map(row => new _primitives_1.ProductId(row.product)),
        readyMoment: new _primitives_1.Moment(orderRow.ready_moment)
    };
}
