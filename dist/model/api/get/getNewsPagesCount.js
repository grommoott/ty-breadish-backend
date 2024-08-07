"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNewsPagesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
async function getNewsPagesCount() {
    try {
        const response = await bdClient_1.default.query('select count(*) from news');
        return Math.ceil(response.rows[0].count / config_1.default.newsPageSize);
    }
    catch (e) {
        const msg = "Error in getNewsPagesCount request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
