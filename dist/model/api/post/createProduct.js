"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createProduct;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function createProduct(name, description, price, itemInfo) {
    try {
        const response = await bdClient_1.default.query(`insert into products values (default, nextval('item_id'), '${name}', '${description}' ${price}, -1, '${itemInfo.toJSON()}') returning *`);
        return (0, _interfaces_1.queryRowToProduct)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createProduct request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
