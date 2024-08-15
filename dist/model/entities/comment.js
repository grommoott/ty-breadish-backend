"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const updateComment_1 = __importDefault(require("@api/put/updateComment"));
const media_1 = require("./media");
const _interfaces_1 = require("@interfaces");
const getCommentsPage_1 = __importDefault(require("@api/get/getCommentsPage"));
const getComment_1 = __importDefault(require("@api/get/getComment"));
const createComment_1 = __importDefault(require("@api/post/createComment"));
const getMedia_1 = __importDefault(require("@api/get/getMedia"));
const deleteComment_1 = __importDefault(require("@api/delete/deleteComment"));
class Comment extends media_1.Media {
    // Private fields
    _id;
    _from;
    _target;
    _content;
    // Getters
    get id() {
        return this._id;
    }
    get from() {
        return this._from;
    }
    get target() {
        return this._target;
    }
    get content() {
        return this._content;
    }
    // Methods
    async edit(data) {
        return await (0, updateComment_1.default)(this._id, data);
    }
    async delete() {
        return await (0, deleteComment_1.default)(this._id);
    }
    // Static constructors
    static async fromId(id) {
        const comment = await (0, getComment_1.default)(id);
        if (comment instanceof Error) {
            return comment;
        }
        return new Comment(comment);
    }
    static async fromMediaId(id) {
        const media = await (0, getMedia_1.default)(id);
        if (media instanceof Error) {
            return media;
        }
        if ((0, _interfaces_1.isMediaIsNew)(media)) {
            return new Error(`Media with this id(${id}) actually is a new, but not a comment`);
        }
        return new Comment(media);
    }
    static async getCommentsPage(mediaId, sortOrder, page) {
        const response = await (0, getCommentsPage_1.default)(mediaId, sortOrder, page);
        if (response instanceof Error) {
            return response;
        }
        return response.map(comment => new Comment(comment));
    }
    static async create(from, target, content) {
        const comment = await (0, createComment_1.default)(from, target, content);
        if (comment instanceof Error) {
            return comment;
        }
        return new Comment(comment);
    }
    toNormalView() {
        return {
            id: this._id.id,
            from: this._from.id,
            target: this._target.id,
            content: this._content,
            mediaId: this.mediaId.id,
            moment: this.moment.moment,
            isEdited: this.isEdited
        };
    }
    constructor({ id, from, target, content, mediaId, moment, isEdited }) {
        super({ mediaId, moment, isEdited });
        this._id = id;
        this._from = from;
        this._target = target;
        this._content = content;
    }
}
exports.Comment = Comment;
