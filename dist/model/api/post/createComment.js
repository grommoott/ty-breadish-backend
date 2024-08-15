"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createComment;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getMedia_1 = __importDefault(require("@api/get/getMedia"));
const getUser_1 = __importDefault(require("@api/get/getUser"));
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createComment(from, target, content, moment = null) {
    try {
        const userWithId = await (0, getUser_1.default)(from);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const mediaWithId = await (0, getMedia_1.default)(target);
        if (mediaWithId instanceof Error) {
            return mediaWithId;
        }
        const _moment = (() => {
            if (moment == null) {
                return new _primitives_1.Moment(new Date().getTime());
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into comments values(default, nextval('media_id'), ${from}, ${target}, '${(0, _helpers_1.pgFormat)(content)}', ${_moment}, false) returning *`);
        return (0, _interfaces_1.queryRowToComment)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createComment request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
