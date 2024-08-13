"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLikeParent;
const _enums_1 = require("@enums");
const _primitives_1 = require("@primitives");
const getItem_1 = __importDefault(require("./getItem"));
const getMedia_1 = __importDefault(require("./getMedia"));
const getReview_1 = __importDefault(require("./getReview"));
async function getLikeParent(target, type) {
    try {
        let likeParent;
        switch (type) {
            case _enums_1.LikeTypes.Item:
                likeParent = await (0, getItem_1.default)(new _primitives_1.ItemId(target.id));
            case _enums_1.LikeTypes.Media:
                likeParent = await (0, getMedia_1.default)(new _primitives_1.MediaId(target.id));
            case _enums_1.LikeTypes.Review:
                likeParent = await (0, getReview_1.default)(new _primitives_1.ReviewId(target.id));
        }
        return likeParent;
    }
    catch (e) {
        const msg = "Error in getLikeParent request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
