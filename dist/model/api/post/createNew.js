"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNew;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createNew(title, content, moment = null) {
    try {
        const _moment = (() => {
            if (moment === null) {
                return _primitives_1.Moment.now();
            }
            else {
                return moment;
            }
        })();
        const request = await bdClient_1.default.query(`insert into news values (default, nextval('media_id'), '${title}', '${content}', ${_moment}) returning *`);
        const aNew = request.rows[0];
        return {
            id: new _primitives_1.NewId(aNew.id),
            mediaId: new _primitives_1.MediaId(aNew.media_id),
            title: aNew.title,
            content: aNew.content,
            moment: new _primitives_1.Moment(aNew.moment)
        };
    }
    catch (e) {
        const msg = "Error in createNew request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
