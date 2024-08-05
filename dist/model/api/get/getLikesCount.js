"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLikesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getLikesCount(mediaId) {
    try {
        const response = await bdClient_1.default.query(`select * from likes where target=${mediaId}`);
        return response.rowCount;
    }
    catch (e) {
        console.error("Error in getLikes request:", e);
        return null;
    }
}
