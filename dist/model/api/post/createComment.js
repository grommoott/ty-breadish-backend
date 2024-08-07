"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createComment;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createComment(from, target, content, moment = null) {
    try {
        const _moment = (() => {
            if (moment == null) {
                return new _primitives_1.Moment(new Date().getTime());
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into comments values(default, nextval('media_id'), ${from}, ${target}, '${content}', ${_moment}, false) returning *`);
        const comment = await response.rows[0];
        return {
            id: new _primitives_1.CommentId(comment.id),
            mediaId: new _primitives_1.MediaId(comment.media_id),
            from: new _primitives_1.UserId(comment.from),
            target: new _primitives_1.MediaId(comment.target),
            content: comment.content,
            moment: new _primitives_1.Moment(comment.moment),
            isEdited: comment.is_edited
        };
    }
    catch (e) {
        const msg = "Error in createComment request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
