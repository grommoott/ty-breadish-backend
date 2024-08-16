"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMedia;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getMedia(id) {
    try {
        const commentWithMediaId = await bdClient_1.default.query(`select * from comments where media_id=${id}`);
        if (commentWithMediaId.rowCount == 1) {
            return (0, _interfaces_1.queryRowToComment)(commentWithMediaId.rows[0]);
        }
        const newWithMediaId = await bdClient_1.default.query(`select * from news where media_id=${id}`);
        if (newWithMediaId.rowCount == 1) {
            return (0, _interfaces_1.queryRowToNew)(newWithMediaId.rows[0]);
        }
        return new Error(`Media with such mediaId(${id}) isn't exists`);
    }
    catch (e) {
        const msg = "Error in getMedia request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
