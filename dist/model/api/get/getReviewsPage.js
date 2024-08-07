"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getReviewsPage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _enums_1 = require("@enums");
const config_1 = __importDefault(require("@api/config"));
const _primitives_1 = require("@primitives");
async function getReviewsPage(itemId, sortOrder, page) {
    try {
        const response = await (() => {
            switch (sortOrder) {
                case _enums_1.ReviewsSortOrders.OldFirst:
                    return bdClient_1.default.query(`select * from reviews order by moment limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.NewFirst:
                    return bdClient_1.default.query(`select * from reviews order by moment desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.LikedFirst:
                    return bdClient_1.default.query(`select * from reviews order by (select count(*) from likes where target=${itemId} and type='review') desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.RatedFirst:
                    return bdClient_1.default.query(`select * from reviews order by rate desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.UnratedFirst:
                    return bdClient_1.default.query(`select * from reviews order by rate limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
            }
        })();
        return response.rows.map(review => {
            return {
                id: new _primitives_1.ReviewId(review.id),
                from: new _primitives_1.UserId(review.from),
                target: new _primitives_1.ItemId(review.target),
                content: review.content,
                rate: review.rate,
                moment: new _primitives_1.Moment(review.moment)
            };
        });
    }
    catch (e) {
        const msg = "Error in getReviewsPage request " + e;
        throw new Error(msg, { cause: 500 });
    }
}
