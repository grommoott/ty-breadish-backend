"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getReviewsPagesCount;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
async function getReviewsPagesCount(itemId) {
    try {
        const response = await bdClient_1.default.query(`select count(*) from reviews where target=${itemId}`);
        return Math.ceil(response.rows[0].count / config_1.default.reviewsPageSize);
    }
    catch (e) {
        const msg = "Error in getReviewsPagesCount request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
