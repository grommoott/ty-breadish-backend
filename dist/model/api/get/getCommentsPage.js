"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCommentsPage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
const _enums_1 = require("@enums");
const _interfaces_1 = require("@interfaces");
const getMedia_1 = __importDefault(require("./getMedia"));
async function getCommentsPage(mediaId, sortOrder, page) {
    try {
        const mediaWithId = await (0, getMedia_1.default)(mediaId);
        if (mediaWithId instanceof Error) {
            return mediaWithId;
        }
        const response = await (() => {
            switch (sortOrder) {
                case _enums_1.CommentsSortOrders.NewFirst:
                    return bdClient_1.default.query(`select * from comments where target=${mediaId} order by moment desc limit ${config_1.default.commentsPageSize} offset ${config_1.default.commentsPageSize * page}`);
                case _enums_1.CommentsSortOrders.OldFirst:
                    return bdClient_1.default.query(`select * from comments where target=${mediaId} order by moment limit ${config_1.default.commentsPageSize} offset ${config_1.default.commentsPageSize * page}`);
                case _enums_1.CommentsSortOrders.LikedFirst:
                    return bdClient_1.default.query(`select * from comments where target=${mediaId} order by (select count(*) from likes where target=${mediaId}) desc limit ${config_1.default.commentsPageSize} offset ${config_1.default.commentsPageSize * page}`);
            }
        })();
        return response.rows.map(_interfaces_1.queryRowToComment);
    }
    catch (e) {
        const msg = "Error in getCommentsPage request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
