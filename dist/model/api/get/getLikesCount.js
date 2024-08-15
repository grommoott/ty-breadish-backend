"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLikesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getLikeParent_1 = __importDefault(require("./getLikeParent"));
const _helpers_1 = require("@helpers");
async function getLikesCount(parentId, type) {
    try {
        const likeParent = await (0, getLikeParent_1.default)(parentId, type);
        if (likeParent instanceof Error) {
            return likeParent;
        }
        const response = await bdClient_1.default.query(`select count(*) from likes where target=${parentId} and type='${(0, _helpers_1.pgFormat)(type)}'`);
        return response.rows[0].count;
    }
    catch (e) {
        const msg = "Error in getLikesCount request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
