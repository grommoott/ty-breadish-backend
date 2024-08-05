import { IComment } from "./comment"

/** Interface for a BDNew
 *
 * id: Id<New>
 * mediaId: MediaId
 * title: string,
 * content: string,
 * moment: Moment
 * */
interface IBDNew {
    id: number,
    mediaId: number,
    title: string,
    content: string,
    moment: number
}

/** Interface for a New
 *
 * id: Id<New>
 * mediaId: MediaId
 * title: string,
 * content: string,
 * moment: Moment
 * getCommentsCount: () => number (prefer to use when only likes count needed)
 * loadNextCommentPage: () => Promise<void>
 * loadedComments: Array<IComment>
 * getLikesCount: () => number
 * */
interface INew {
    id: number,
    mediaId: number,
    title: string,
    content: string,
    moment: number,
    getCommentsCount: () => Promise<number>,
    loadNextCommentPage: () => Promise<void>,
    loadedComments: Array<IComment>,
    getLikesCount: () => Promise<number>,
}

export { IBDNew, INew }
