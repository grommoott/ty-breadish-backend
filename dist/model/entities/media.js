"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const getMedia_1 = __importDefault(require("@api/get/getMedia"));
const entity_1 = require("./entity");
const comment_1 = require("./comment");
class Media extends entity_1.Entity {
    // Private fields
    _media;
    // Getters
    get mediaId() {
        return this._media.mediaId;
    }
    get moment() {
        return this._media.moment;
    }
    get isEdited() {
        return this._media.isEdited;
    }
    // Methods
    async getCommentsPage(sortOrder, page) {
        const comments = await comment_1.Comment.getCommentsPage(this._media.mediaId, sortOrder, page);
        return comments;
    }
    // Static constructors
    static async fromMediaId(id) {
        const media = await (0, getMedia_1.default)(id);
        if (media instanceof Error) {
            return media;
        }
        return new Media(media);
    }
    toNormalView() {
        return {
            mediaId: this._media.mediaId.id,
            moment: this._media.moment.moment,
            idEdited: this._media.isEdited
        };
    }
    constructor({ mediaId, moment, isEdited }) {
        super();
        this._media = { mediaId, moment, isEdited };
    }
}
exports.Media = Media;
