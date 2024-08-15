"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReview;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getItem_1 = __importDefault(require("@api/get/getItem"));
const getUser_1 = __importDefault(require("@api/get/getUser"));
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createReview(from, target, content, rate, moment = null) {
    try {
        const userWithId = await (0, getUser_1.default)(from);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const itemWithId = await (0, getItem_1.default)(target);
        if (itemWithId instanceof Error) {
            return itemWithId;
        }
        const reviews = await bdClient_1.default.query(`select * from reviews where "from"=${from} and target=${target}`);
        if (reviews.rowCount != 0) {
            return new Error(`There is already review from ${from} to ${target}`);
        }
        const _moment = (() => {
            if (moment === null) {
                return _primitives_1.Moment.now();
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into reviews values (default, ${from}, ${target}, '${(0, _helpers_1.pgFormat)(content)}', '${(0, _helpers_1.pgFormat)(rate)}', ${_moment}) returning *`);
        return (0, _interfaces_1.queryRowToReview)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createReview request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
