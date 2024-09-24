"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCommentsCount;
const getMedia_1 = __importDefault(require("./getMedia"));
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getCommentsCount(mediaId) {
    try {
        const media = await (0, getMedia_1.default)(mediaId);
        if (media instanceof Error) {
            return media;
        }
        const response = await bdClient_1.default.query(`select count(*) from comments where target=${mediaId.toBDView()}`);
        return response.rows[0].count;
    }
    catch (e) {
        const msg = "Error in getCommentsPage request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
