"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createComment;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
async function createComment(from, target, content, id = null, moment = null) {
    try {
        const _id = (() => {
            if (id === null) {
                return "(select count(*) from comments)";
            }
            else {
                return id;
            }
        })();
        const _mediaId = `${config_1.default.mediaIdCommentOffset} + ${_id}`;
        const _moment = (() => {
            if (moment == null) {
                return new Date().getTime();
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into comments values(${_id}, ${_mediaId}, ${from}, ${target}, '${content}', ${_moment}) returning *`);
        const comment = response.rows[0];
        return {
            id: comment.id,
            mediaId: comment.mediaId,
            from: comment.from,
            target: comment.target,
            content: comment.content,
            moment: comment.moment
        };
    }
    catch (e) {
        const msg = "Error in createComment request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
