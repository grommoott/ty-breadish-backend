"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getProducts;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getProducts() {
    try {
        const response = await bdClient_1.default.query("select * from products");
        return response.rows.map(_interfaces_1.queryRowToProduct);
    }
    catch (e) {
        const msg = "Error in getProducts request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
