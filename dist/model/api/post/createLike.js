"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createLike;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getLikeParent_1 = __importDefault(require("@api/get/getLikeParent"));
const getUser_1 = __importDefault(require("@api/get/getUser"));
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
async function createLike(from, target, type = _enums_1.LikeTypes.Media) {
    try {
        const userWithId = await (0, getUser_1.default)(from);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const likeParent = await (0, getLikeParent_1.default)(target, type);
        if (likeParent instanceof Error) {
            return likeParent;
        }
        const likes = await bdClient_1.default.query(`select * from likes where "from"=${from} and target=${target} and type='${(0, _helpers_1.pgFormat)(type)}'`);
        if (likes.rowCount != 0) {
            return new Error(`There is already like from ${from} and with target ${target}(${type})`);
        }
        const response = await bdClient_1.default.query(`insert into likes values (default, ${from}, ${target}, '${(0, _helpers_1.pgFormat)(type)}') returning *`);
        return (0, _interfaces_1.queryRowToLike)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createLike request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
