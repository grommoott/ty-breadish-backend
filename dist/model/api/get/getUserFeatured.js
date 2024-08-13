"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserFeatured;
const bdClient_js_1 = __importDefault(require("@api/bdClient.js"));
const _interfaces_1 = require("@interfaces");
const getUser_1 = __importDefault(require("./getUser"));
async function getUserFeatured(userId) {
    try {
        const userWithId = await (0, getUser_1.default)(userId);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const response = await bdClient_js_1.default.query(`select * from featured where "from"=${userId}`);
        return response.rows.map(_interfaces_1.queryRowToFeatured);
    }
    catch (e) {
        const msg = "Error in getUserFeatured request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
