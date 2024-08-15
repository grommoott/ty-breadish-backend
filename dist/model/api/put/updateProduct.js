"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateProduct;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getProduct_1 = __importDefault(require("@api/get/getProduct"));
const _helpers_1 = require("@helpers");
async function updateProduct(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const productWithId = await (0, getProduct_1.default)(id);
        if (productWithId instanceof Error) {
            return productWithId;
        }
        const nameConverter = (name) => {
            switch (name) {
                case "itemInfo":
                    return "item_info";
                default:
                    return name;
            }
        };
        const valueConverter = (key, value) => {
            switch (key) {
                case "itemInfo":
                    return value.toBDView();
                case "price":
                    return value.toBDView();
                default:
                    return `'${(0, _helpers_1.pgFormat)(value)}'`;
            }
        };
        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`;
        });
        await bdClient_1.default.query(`update products set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateProduct request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
