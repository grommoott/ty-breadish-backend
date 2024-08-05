"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCommentsPagesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
async function getCommentsPagesCount(mediaId) {
    try {
        const response = await bdClient_1.default.query(`select count(*) from comments where target=${mediaId}`);
        return Math.ceil(response.rows[0].count / config_1.default.commentsPageSize);
    }
    catch (e) {
        const msg = "Error in getCommentsPagesCount request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
