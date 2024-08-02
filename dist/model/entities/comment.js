import Media from "./media.js";
class Comment extends Media {
    get id() {
        return this._id;
    }
    get from() {
        return this._from;
    }
    get content() {
        return this._content;
    }
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
export default Comment;
