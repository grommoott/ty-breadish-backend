import { IComment } from "model/interfaces/comment.js"

class Media {
    private _mediaId: number

    public get mediaId(): number {
        return this._mediaId
    }

    public async getCommentsCount(): Promise<number> {
        return new Promise((resolve, _) => resolve(0))
    }

    private _pagesLoaded: number = 0

    public async loadComments(): Promise<void> {
        return new Promise((resolve, _) => resolve())
    }

    private _loadedComments: Array<Comment> = new Array<Comment>()

    public get loadedComments(): Array<Comment> {
        return this._loadedComments.map((a) => a)
    }

    public async getLikesCount(): Promise<number> {
        return new Promise((resolve, _) => resolve(0))
    }

    constructor(mediaId: number) {
        this._mediaId = mediaId
    }
}

export default Media
