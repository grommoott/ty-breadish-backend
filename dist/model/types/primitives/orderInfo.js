"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrderInfoIsPickUpOrderInfo = isOrderInfoIsPickUpOrderInfo;
exports.isOrderInfoIsCourierOrderInfo = isOrderInfoIsCourierOrderInfo;
const _helpers_1 = require("@helpers");
const orderInfo_1 = require("../enums/orderInfo");
function isOrderInfoIsPickUpOrderInfo(orderInfo) {
    return typeof orderInfo?.bakeryAddress === "string" &&
        (0, _helpers_1.isInEnum)(orderInfo_1.PickUpOrderStates, orderInfo?.state);
}
function isOrderInfoIsCourierOrderInfo(orderInfo) {
    return typeof orderInfo?.bakeryAddress === "string" &&
        typeof orderInfo?.deliveryAddress === "string" &&
        (0, _helpers_1.isInEnum)(orderInfo_1.PickUpOrderStates, orderInfo?.state);
}
