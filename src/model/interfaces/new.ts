import { MediaId, Moment, NewId } from "@primitives"
import { IComment } from "./comment"

/** Interface for a BDNew
 *
 * id: NewId
 * mediaId: MediaId
 * title: string,
 * content: string,
 * moment: Moment
 * */
interface IBDNew {
    id: NewId,
    mediaId: MediaId,
    title: string,
    content: string,
    moment: Moment
}

/** Interface for a New
 *
 * id: NewId
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
