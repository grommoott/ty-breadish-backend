"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateOrder;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getOrder_1 = __importDefault(require("@api/get/getOrder"));
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _primitives_1 = require("@primitives");
async function updateOrder(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const orderWithId = await (0, getOrder_1.default)(id);
        if (orderWithId instanceof Error) {
            return orderWithId;
        }
        if (data.orderInfo) {
            const newOrderType = (() => {
                if (data.orderType) {
                    return data.orderType;
                }
                else {
                    return orderWithId.orderType;
                }
            })();
            switch (newOrderType) {
                case _enums_1.OrderTypes.Courier:
                    if ((0, _primitives_1.isOrderInfoIsPickUpOrderInfo)(data.orderInfo)) {
                        throw new Error("Expected CourierOrderInfo but got PickUpOrderInfo");
                    }
                case _enums_1.OrderTypes.PickUp:
                    if ((0, _primitives_1.isOrderInfoIsCourierOrderInfo)(data.orderInfo)) {
                        throw new Error("Expected PickUpOrderInfo but got CourierOrderInfo");
                    }
            }
        }
        const nameConverter = (name) => {
            switch (name) {
                case "orderType":
                    return "order_type";
                case "orderInfo":
                    return "order_info";
                case "readyMoment":
                    return "ready_moment";
                case "paymentStatus":
                    return "payment_status";
                default:
                    return name;
            }
        };
        const valueConverter = (key, value) => {
            switch (key) {
                case "orderInfo":
                    return `'${(0, _helpers_1.pgFormat)(JSON.stringify(value))}'`;
                case "readyMoment":
                    return value.toBDView();
                default:
                    return `'${(0, _helpers_1.pgFormat)(value)}'`;
            }
        };
        const setString = Object.entries(data).filter(([_, val]) => val != undefined).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`;
        }).join(", ");
        await bdClient_1.default.query(`update orders set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateOrder request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
