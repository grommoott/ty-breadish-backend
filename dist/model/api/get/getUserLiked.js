"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserLiked;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getUserLiked(userId) {
    try {
        const response = await bdClient_1.default.query(`select * from likes where "from"=${userId}`);
        return response.rows.map(item => {
            return {
                id: item.id,
                from: item.from,
                target: item.target,
            };
        });
    }
    catch (e) {
        const msg = "Error in getUserLiked request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
