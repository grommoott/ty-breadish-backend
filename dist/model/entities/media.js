"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Media {
    _mediaId;
    get mediaId() {
        return this._mediaId;
    }
    async getCommentsCount() {
        return new Promise((resolve, _) => resolve(0));
    }
    _pagesLoaded = 0;
    async loadNextCommentPage() {
        return new Promise((resolve, _) => resolve());
    }
    _loadedComments = new Array();
    get loadedComments() {
        return this._loadedComments.map((a) => a);
    }
    async getLikesCount() {
        return new Promise((resolve, _) => resolve(0));
    }
    constructor(mediaId) {
        this._mediaId = mediaId;
    }
}
exports.default = Media;
