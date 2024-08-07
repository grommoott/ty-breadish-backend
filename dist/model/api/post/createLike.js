"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createLike;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _enums_1 = require("@enums");
const _primitives_1 = require("@primitives");
async function createLike(from, target, type = _enums_1.LikeTypes.Media, id = null) {
    try {
        const likes = await bdClient_1.default.query(`select * from likes where "from"=${from} and target=${target} and type='${type}'`);
        if (likes.rowCount != 0) {
            return null;
        }
        const _id = (() => {
            if (id === null) {
                return "(select count(*) from likes)";
            }
            else {
                return id;
            }
        })();
        const response = await bdClient_1.default.query(`insert into likes values (${_id}, ${from}, ${target}, '${type}') returning *`);
        const like = response.rows[0];
        return {
            id: new _primitives_1.LikeId(like.id),
            from: new _primitives_1.UserId(like.from),
            target: new _primitives_1.Id(like.target),
            type: like.type
        };
    }
    catch (e) {
        const msg = "Error in createLike request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
