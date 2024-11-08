"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getBakeries;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getBakeries() {
    try {
        const response = await bdClient_1.default.query(`select * from bakeries`);
        return response.rows.map(_interfaces_1.queryRowToBakery);
    }
    catch (e) {
        const msg = "Error in getBakeries request " + e;
        throw new Error(msg, { cause: 500 });
    }
}
