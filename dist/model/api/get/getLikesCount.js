"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLikesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getLikesCount(parentId, type) {
    try {
        const response = await bdClient_1.default.query(`select count(*) from likes where target=${parentId} and type='${type}'`);
        return response.rows[0].count;
    }
    catch (e) {
        const msg = "Error in getLikesCount request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
