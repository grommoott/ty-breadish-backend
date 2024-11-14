"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getReviewByItemUser;
const _interfaces_1 = require("@interfaces");
const getUser_1 = __importDefault(require("./getUser"));
const getItem_1 = __importDefault(require("./getItem"));
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getReviewByItemUser(target, user) {
    try {
        const userWithId = await (0, getUser_1.default)(user);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const targetWithId = await (0, getItem_1.default)(target);
        if (targetWithId instanceof Error) {
            return targetWithId;
        }
        const review = await bdClient_1.default.query(`select * from reviews where target=${target} and "from"=${user}`);
        if (review.rowCount == 0) {
            return new Error("This user have not written review on this item");
        }
        return (0, _interfaces_1.queryRowToReview)(review.rows[0]);
    }
    catch (e) {
        const msg = "Error in getReviewByUser request: " + e;
        throw new Error(msg);
    }
}
