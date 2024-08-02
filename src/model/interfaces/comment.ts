/** Interface for BDComment 
 *
 * id: Id<Comment>
 * mediaId: MediaId
 * from: Id<User>
 * content: string
 * moment: Moment
 * */
interface IBDComment {
    id: number,
    mediaId: number,
    from: number,
    content: string,
    moment: number
}

/** Interface for Comment
 *
 * id: Id<Comment>
 * mediaId: MediaId
 * from: Id<User>
 * content: string
 * moment: Moment
 * getCommentsCount: () => Promise<number>
 * loadComments: () => Promise<void>
 * loadedComments: Array<IComment>
 * getLikesCount: () => number
 * */
interface IComment {
    id: number,
    mediaId: number,
    from: number,
    content: string,
    moment: number,
    getCommentsCount: () => Promise<number>,
    loadComments: () => Promise<void>,
    loadedComments: Array<Comment>,
    getLikesCount: () => Promise<number>,
}


export { IBDComment, IComment }
