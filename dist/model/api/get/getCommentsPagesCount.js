"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCommentsPagesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
const getMedia_1 = __importDefault(require("./getMedia"));
async function getCommentsPagesCount(mediaId) {
    try {
        const mediaWithId = await (0, getMedia_1.default)(mediaId);
        if (mediaWithId instanceof Error) {
            return mediaWithId;
        }
        const response = await bdClient_1.default.query(`select count(*) from comments where target=${mediaId}`);
        return Math.ceil(response.rows[0].count / config_1.default.commentsPageSize);
    }
    catch (e) {
        const msg = "Error in getCommentsPagesCount request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
