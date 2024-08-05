"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getReviewsPage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _enums_1 = require("@enums");
const config_1 = __importDefault(require("@api/config"));
async function getReviewsPage(itemId, sortOrder, page) {
    try {
        const response = await (() => {
            switch (sortOrder) {
                case _enums_1.ReviewsSortOrder.OldFirst:
                    return bdClient_1.default.query(`select * from reviews order by moment limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrder.NewFirst:
                    return bdClient_1.default.query(`select * from reviews order by moment desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrder.RateFirst:
                    return bdClient_1.default.query(`select * from reviews order by rate desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrder.LikedFirst:
                    return bdClient_1.default.query(`select * from reviews order by (select count(*) from likes where target=${itemId} and type='review') desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrder.UnrateFirst:
                    return bdClient_1.default.query(`select * from reviews order by rate limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
            }
        })();
        return response.rows.map(review => {
            return {
                id: review.id,
                target: review.target,
                from: review.from,
                content: review.content,
                rate: review.rate
            };
        });
    }
    catch (e) {
        const msg = "Error in getReviewsPage request " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
