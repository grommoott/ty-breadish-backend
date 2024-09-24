"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMediaIsComment = isMediaIsComment;
exports.queryRowToComment = queryRowToComment;
const _primitives_1 = require("@primitives");
function isMediaIsComment(media) {
    return media?.id instanceof _primitives_1.CommentId &&
        media?.from instanceof _primitives_1.UserId &&
        media?.target instanceof _primitives_1.MediaId &&
        typeof media?.content === "string";
}
function queryRowToComment(row) {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "content" in row &&
        "media_id" in row &&
        "moment" in row &&
        "is_edited" in row)) {
        throw new Error("Invalid query row to convert into IComment");
    }
    return {
        id: new _primitives_1.CommentId(row.id),
        from: new _primitives_1.UserId(row.from),
        target: new _primitives_1.MediaId(row.target),
        content: row.content,
        mediaId: new _primitives_1.MediaId(row.media_id),
        moment: new _primitives_1.Moment(row.moment),
        isEdited: row.is_edited
    };
}
