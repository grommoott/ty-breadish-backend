"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getReviewsPage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
const _enums_1 = require("@enums");
const config_1 = __importDefault(require("@api/config"));
const getItem_1 = __importDefault(require("./getItem"));
const _helpers_1 = require("@helpers");
async function getReviewsPage(itemId, sortOrder, page) {
    try {
        const itemWithId = await (0, getItem_1.default)(itemId);
        if (itemWithId instanceof Error) {
            return itemWithId;
        }
        const response = await (() => {
            switch (sortOrder) {
                case _enums_1.ReviewsSortOrders.OldFirst:
                    return bdClient_1.default.query(`select * from reviews where target=${itemId} order by moment limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.NewFirst:
                    return bdClient_1.default.query(`select * from reviews where target=${itemId} order by moment desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.LikedFirst:
                    return bdClient_1.default.query(`select * from reviews where target=${itemId} order by (select count(*) from likes where target=reviews.id and type='${(0, _helpers_1.pgFormat)(_enums_1.LikeTypes.Review)}') desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.RatedFirst:
                    return bdClient_1.default.query(`select * from reviews where target=${itemId} order by rate desc limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
                case _enums_1.ReviewsSortOrders.UnratedFirst:
                    return bdClient_1.default.query(`select * from reviews where target=${itemId} order by rate limit ${config_1.default.reviewsPageSize} offset ${config_1.default.reviewsPageSize * page}`);
            }
        })();
        return response.rows.map(_interfaces_1.queryRowToReview);
    }
    catch (e) {
        const msg = "Error in getReviewsPage request " + e;
        throw new Error(msg, { cause: 500 });
    }
}
