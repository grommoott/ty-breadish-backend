"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCommentsPage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
const _enums_1 = require("@enums");
async function getCommentsPage(mediaId, sortOrder, page) {
    try {
        const response = await (() => {
            switch (sortOrder) {
                case _enums_1.CommentsSortOrder.NewFirst:
                    return bdClient_1.default.query(`select * from comments where target=${mediaId} order by moment desc limit ${config_1.default.commentsPageSize} offset ${config_1.default.commentsPageSize * page}`);
                case _enums_1.CommentsSortOrder.OldFirst:
                    return bdClient_1.default.query(`select * from comments where target=${mediaId} order by moment limit ${config_1.default.commentsPageSize} offset ${config_1.default.commentsPageSize * page}`);
                case _enums_1.CommentsSortOrder.LikedFirst:
                    return bdClient_1.default.query(`select * from comments where target=${mediaId} order by (select count(*) from likes where target=${mediaId}) desc limit ${config_1.default.commentsPageSize} offset ${config_1.default.commentsPageSize * page}`);
            }
        })();
        return response.rows.map(comment => {
            return {
                id: comment.id,
                mediaId: comment.media_id,
                from: comment.from,
                target: comment.target,
                content: comment.content,
                moment: comment.moment
            };
        });
    }
    catch (e) {
        const msg = "Error in getCommentsPage request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
