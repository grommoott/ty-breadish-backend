"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.New = void 0;
const getMedia_1 = __importDefault(require("@api/get/getMedia"));
const getNew_1 = __importDefault(require("@api/get/getNew"));
const getNewsPage_1 = __importDefault(require("@api/get/getNewsPage"));
const _interfaces_1 = require("@interfaces");
const media_1 = require("./media");
const updateNew_1 = __importDefault(require("@api/put/updateNew"));
const deleteNew_1 = __importDefault(require("@api/delete/deleteNew"));
const createNew_1 = __importDefault(require("@api/post/createNew"));
class New extends media_1.Media {
    // Private fields
    _id;
    _title;
    _content;
    // Getters
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get content() {
        return this._content;
    }
    // Methods
    async edit(data) {
        return await (0, updateNew_1.default)(this._id, data);
    }
    async delete() {
        return await (0, deleteNew_1.default)(this._id);
    }
    toListView() {
        return {
            id: this.id.id,
            title: this.title,
            mediaId: this.mediaId.id,
            moment: this.moment.moment,
        };
    }
    // Static constructors
    static async getNewsPage(page) {
        const news = await (0, getNewsPage_1.default)(page);
        if (news instanceof Error) {
            return news;
        }
        return news.map(aNew => new New(aNew));
    }
    static async fromId(id) {
        const aNew = await (0, getNew_1.default)(id);
        if (aNew instanceof Error) {
            return aNew;
        }
        return new New(aNew);
    }
    static async fromMediaId(id) {
        const media = await (0, getMedia_1.default)(id);
        if (media instanceof Error) {
            return media;
        }
        if ((0, _interfaces_1.isMediaIsComment)(media)) {
            return new Error(`Media with this id(${id}) actually is a comment, but not a new`);
        }
        return new New(media);
    }
    static async create(title, content) {
        const aNew = await (0, createNew_1.default)(title, content);
        if (aNew instanceof Error) {
            return aNew;
        }
        return new New(aNew);
    }
    toNormalView() {
        return {
            id: this.id.id,
            title: this.title,
            content: this.content,
            mediaId: this.mediaId.id,
            moment: this.moment.moment,
            isEdited: this.isEdited
        };
    }
    constructor({ id, title, content, mediaId, moment, isEdited }) {
        super({ mediaId, moment, isEdited });
        this._id = id;
        this._title = title;
        this._content = content;
    }
}
exports.New = New;
