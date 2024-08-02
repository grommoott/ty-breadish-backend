import { IComment } from "./comment.js"

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
 * getComments: (page:number) => Id<Comment>
 * getCommentsCount: () => number (prefer to use when only likes count needed)
 * getLikesCount: () => number
 * */
interface INew {
    id: number,
    mediaId: number,
    title: string,
    content: string,
    moment: number,
    getCommentsCount: () => Promise<number>,
    loadComments: () => Promise<void>,
    loadedComments: Array<IComment>,
    getLikesCount: () => Promise<number>,
}

export { IBDNew, INew }
