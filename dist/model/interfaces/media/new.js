"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMediaIsNew = isMediaIsNew;
exports.queryRowToNew = queryRowToNew;
const _primitives_1 = require("@primitives");
function isMediaIsNew(media) {
    return media?.id instanceof _primitives_1.NewId &&
        typeof media?.title === "string" &&
        typeof media?.content === "string";
}
function queryRowToNew(row) {
    if (!("id" in row &&
        "title" in row &&
        "content" in row &&
        "media_id" in row &&
        "moment" in row &&
        "is_edited" in row)) {
        throw new Error("Invalid query row to convert into INew");
    }
    return {
        id: new _primitives_1.NewId(row.id),
        title: row.title,
        content: row.content,
        mediaId: new _primitives_1.MediaId(row.media_id),
        moment: new _primitives_1.Moment(row.moment),
        isEdited: row.is_edited
    };
}
