"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrderInfoIsPickUpOrderInfo = isOrderInfoIsPickUpOrderInfo;
exports.isOrderInfoIsCourierOrderInfo = isOrderInfoIsCourierOrderInfo;
exports.orderInfoToNormalView = orderInfoToNormalView;
const _helpers_1 = require("@helpers");
const orderInfo_1 = require("../enums/orderInfo");
function orderInfoToNormalView(orderInfo) {
    const id = orderInfo.bakeryId._id;
    const tmp = { ...orderInfo };
    tmp.bakeryId = id;
    return tmp;
}
function isOrderInfoIsPickUpOrderInfo(orderInfo) {
    return (0, _helpers_1.isInEnum)(orderInfo_1.PickUpOrderStates, orderInfo?.state);
}
function isOrderInfoIsCourierOrderInfo(orderInfo) {
    return typeof orderInfo?.deliveryAddress === "string" &&
        (0, _helpers_1.isInEnum)(orderInfo_1.CourierOrderStates, orderInfo?.state);
}
