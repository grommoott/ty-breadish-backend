"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getImage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
async function getImage(id, category) {
    try {
        const response = await bdClient_1.default.query(`select * from images where id=${id} and category='${(0, _helpers_1.pgFormat)(category)}'`);
        if (response.rowCount == 0) {
            return new Error(`Image with such id(${id}) in category ${category} isn't exists`);
        }
        return (0, _interfaces_1.queryRowToImage)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in getImage request: " + e;
        return new Error(msg, { cause: 500 });
    }
}
