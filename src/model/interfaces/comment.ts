import { CommentId, MediaId, Moment, UserId } from "@primitives"

/** Interface for BDComment 
 *
 * id: CommentId
 * mediaId: MediaId
 * from: UserId
 * target: MediaId
 * content: string
 * moment: Moment
 * */
interface IBDComment {
    id: CommentId,
    mediaId: MediaId,
    from: UserId,
    target: MediaId,
    content: string,
    moment: Moment
}

/** Interface for Comment
 *
 * id: CommentId 
 * mediaId: MediaId
 * from: UserId
 * target: number
 * content: string
 * moment: Moment
 * getCommentsCount: () => Promise<number>
 * loadNextCommentPage: () => Promise<void>
 * loadedComments: Array<IComment>
 * getLikesCount: () => number
 * */
interface IComment {
    id: CommentId,
    mediaId: MediaId,
    from: UserId,
    target: MediaId,
    content: string,
    moment: Moment,
    getCommentsCount: () => Promise<number>,
    loadNextCommentPage: () => Promise<void>,
    loadedComments: Array<Comment>,
    getLikesCount: () => Promise<number>,
}


export { IBDComment, IComment }
