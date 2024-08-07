import { CommentId, MediaId, Moment, UserId } from "@primitives"
import { IMedia } from "./media"

interface IBDComment extends IMedia {
    id: CommentId,
    from: UserId,
    target: MediaId,
    content: string,
}

interface IComment {
    getCommentsCount: () => Promise<number>,
    loadNextCommentPage: () => Promise<void>,
    loadedComments: Array<Comment>,
    getLikesCount: () => Promise<number>,
}


export { IBDComment, IComment }
