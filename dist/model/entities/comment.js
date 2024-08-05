"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_1 = __importDefault(require("./media"));
class Comment extends media_1.default {
    _id;
    get id() {
        return this._id;
    }
    _from;
    get from() {
        return this._from;
    }
    _content;
    get content() {
        return this._content;
    }
    _moment;
    get moment() {
        return this._moment;
    }
    constructor(id, mediaId, from, content, moment) {
        super(mediaId);
        this._id = id;
        this._from = from;
        this._content = content;
        this._moment = moment;
    }
}
exports.default = Comment;
