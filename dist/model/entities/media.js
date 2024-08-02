var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Media {
    get mediaId() {
        return this._mediaId;
    }
    getCommentsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, _) => resolve(0));
        });
    }
    loadComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, _) => resolve());
        });
    }
    get loadedComments() {
        return this._loadedComments.map((a) => a);
    }
    getLikesCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, _) => resolve(0));
        });
    }
    constructor(mediaId) {
        this._pagesLoaded = 0;
        this._loadedComments = new Array();
        this._mediaId = mediaId;
    }
}
export default Media;
