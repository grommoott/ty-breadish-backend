import { CommentId, MediaId, Moment, UserId } from "@primitives";
import updateComment from "@api/put/updateComment";
import { Media } from "./media";
import { CommentsSortOrder, CommentsSortOrders } from "@enums";
import { IComment, IMedia, isMediaIsComment, isMediaIsNew } from "@interfaces";
import getCommentsPage from "@api/get/getCommentsPage";
import { isJSDocCommentContainingNode } from "typescript";
import getComment from "@api/get/getComment";
import createComment from "@api/post/createComment";
import getMedia from "@api/get/getMedia";
import deleteComment from "@api/delete/deleteComment";

class Comment extends Media {

    // Private fields

    private _id: CommentId
    private _from: UserId
    private _target: MediaId
    private _content: string

    // Getters

    public get id(): CommentId {
        return this._id
    }

    public get from(): UserId {
        return this._from
    }

    public get target(): MediaId {
        return this._target
    }

    public get content(): string {
        return this._content
    }

    // Methods

    public async edit(data: { content?: string }): Promise<void | Error> {
        return await updateComment(this._id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteComment(this._id)
    }

    // Static constructors

    public static async fromId(id: CommentId): Promise<Comment | Error> {
        const comment: IComment | Error = await getComment(id)

        if (comment instanceof Error) {
            return comment
        }

        return new Comment(comment)
    }

    public static override async fromMediaId(id: MediaId): Promise<Comment | Error> {
        const media: IMedia | Error = await getMedia(id)

        if (media instanceof Error) {
            return media
        }

        if (isMediaIsNew(media)) {
            return new Error(`Media with this id(${id}) actually is a new, but not a comment`)
        }

        return new Comment(media as IComment)
    }

    public static async getCommentsPage(mediaId: MediaId, sortOrder: CommentsSortOrder, page: number): Promise<Array<Comment> | Error> {
        const response = await getCommentsPage(mediaId, sortOrder, page)

        if (response instanceof Error) {
            return response
        }

        return response.map(comment => new Comment(comment))
    }

    public static async create(from: UserId, target: MediaId, content: string): Promise<Comment | Error> {
        const comment: IComment | Error = await createComment(from, target, content)

        if (comment instanceof Error) {
            return comment
        }

        return new Comment(comment)
    }

    public override serialize(): string {
        return JSON.stringify({
            id: this._id.id,
            from: this._from.id,
            target: this._target.id,
            content: this._content,
            mediaId: this.mediaId.id,
            moment: this.moment.moment,
            isEdited: this.isEdited
        })
    }

    private constructor({ id, from, target, content, mediaId, moment, isEdited }: IComment) {
        super({ mediaId, moment, isEdited })

        this._id = id
        this._from = from
        this._target = target
        this._content = content
    }
}

export { Comment }
