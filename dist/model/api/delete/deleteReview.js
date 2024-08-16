"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteReview;
const updateItemRate_1 = __importDefault(require("@api/put/updateItemRate"));
const getReview_1 = __importDefault(require("@api/get/getReview"));
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function deleteReview(id) {
    try {
        const reviewsWithId = await (0, getReview_1.default)(id);
        if (reviewsWithId instanceof Error) {
            return reviewsWithId;
        }
        const response = await bdClient_1.default.query(`delete from reviews where id=${id}`);
        await (0, updateItemRate_1.default)(reviewsWithId.target);
        return response.rowCount !== 0;
    }
    catch (e) {
        const msg = "Error in deleteReview request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
