import { IComment } from "@interfaces/comment.js"
import Media from "./media"

class Comment extends Media implements IComment {
    private _id: number

    public get id(): number {
        return this._id
    }

    private _from: number

    public get from(): number {
        return this._from
    }

    private _content: string

    public get content(): string {
        return this._content
    }

    private _moment: number

    public get moment(): number {
        return this._moment
    }

    constructor(id: number, mediaId: number, from: number, content: string, moment: number) {
        super(mediaId)

        this._id = id
        this._from = from
        this._content = content
        this._moment = moment
    }
}

export default Comment
