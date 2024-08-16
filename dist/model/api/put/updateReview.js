"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateReview;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getReview_1 = __importDefault(require("@api/get/getReview"));
const updateItemRate_1 = __importDefault(require("@api/put/updateItemRate"));
const _helpers_1 = require("@helpers");
async function updateReview(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const reviewsWithId = await (0, getReview_1.default)(id);
        if (reviewsWithId instanceof Error) {
            return reviewsWithId;
        }
        const valueConverter = (key, value) => {
            return `'${(0, _helpers_1.pgFormat)(value)}'`;
        };
        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`;
        }).join(", ");
        await bdClient_1.default.query(`update reviews set ${setString} where id=${id}`);
        await (0, updateItemRate_1.default)(reviewsWithId.target);
    }
    catch (e) {
        const msg = "Error in updateReview request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
