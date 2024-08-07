"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReview;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createReview(from, target, content, rate, id = null, moment = null) {
    try {
        const reviews = await bdClient_1.default.query(`select * from reviews where "from"=${from} and target=${target}`);
        if (reviews.rowCount != 0) {
            return null;
        }
        const _moment = (() => {
            if (moment === null) {
                return _primitives_1.Moment.now();
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into reviews values (default, ${from}, ${target}, '${content}', '${rate}', ${_moment}) returning *`);
        const review = response.rows[0];
        return {
            id: new _primitives_1.ReviewId(review.id),
            from: new _primitives_1.UserId(review.from),
            target: new _primitives_1.ItemId(review.target),
            content: review.content,
            rate: review.rate,
            moment: new _primitives_1.Moment(review.moment)
        };
    }
    catch (e) {
        const msg = "Error in createReview request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
