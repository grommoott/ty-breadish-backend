"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createBakery;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function createBakery(address, coords) {
    try {
        const response = await bdClient_1.default.query(`insert into bakeries values (default, ${address}, ${coords}) returning *`);
        return (0, _interfaces_1.queryRowToBakery)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createBakery request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
