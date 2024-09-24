"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const deleteLike_1 = __importDefault(require("@api/delete/deleteLike"));
const getLike_1 = __importDefault(require("@api/get/getLike"));
const getUserLiked_1 = __importDefault(require("@api/get/getUserLiked"));
const createLike_1 = __importDefault(require("@api/post/createLike"));
const entity_1 = require("./entity");
const getLikesCount_1 = __importDefault(require("@api/get/getLikesCount"));
class Like extends entity_1.Entity {
    // Private fields
    _like;
    // Getters
    get id() {
        return this._like.id;
    }
    get from() {
        return this._like.from;
    }
    get target() {
        return this._like.target;
    }
    get type() {
        return this._like.type;
    }
    // Methods
    async delete() {
        return (0, deleteLike_1.default)(this._like.id);
    }
    // Static constructors
    static async fromId(id) {
        const like = await (0, getLike_1.default)(id);
        if (like instanceof Error) {
            return like;
        }
        return new Like(like);
    }
    static async fromUser(id) {
        const likes = await (0, getUserLiked_1.default)(id);
        if (likes instanceof Error) {
            return likes;
        }
        return likes.map(like => new Like(like));
    }
    static async create(from, target, type) {
        const like = await (0, createLike_1.default)(from, target, type);
        if (like instanceof Error) {
            return like;
        }
        return new Like(like);
    }
    static async getCount(target, type) {
        return await (0, getLikesCount_1.default)(target, type);
    }
    toNormalView() {
        return {
            id: this._like.id.id,
            from: this._like.from.id,
            target: this._like.target.id,
            type: this._like.type
        };
    }
    constructor({ id, from, target, type }) {
        super();
        this._like = { id, from, target, type };
    }
}
exports.Like = Like;
