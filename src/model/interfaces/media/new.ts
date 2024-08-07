import { MediaId, Moment, NewId } from "@primitives"
import { IComment } from "./comment"
import { IMedia } from "./media"

interface IBDNew extends IMedia {
    id: NewId,
    title: string,
    content: string,
}

interface INew {
    getCommentsCount: () => Promise<number>,
    loadNextCommentPage: () => Promise<void>,
    loadedComments: Array<IComment>,
    getLikesCount: () => Promise<number>,
}

export { IBDNew, INew }
