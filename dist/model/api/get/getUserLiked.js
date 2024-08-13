"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserLiked;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
const getUser_1 = __importDefault(require("./getUser"));
async function getUserLiked(userId) {
    try {
        const userWithId = await (0, getUser_1.default)(userId);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const response = await bdClient_1.default.query(`select * from likes where "from"=${userId}`);
        return response.rows.map(_interfaces_1.queryRowToLike);
    }
    catch (e) {
        const msg = "Error in getUserLiked request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
