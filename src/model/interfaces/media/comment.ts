import { CommentId, MediaId, Moment, UserId } from "@primitives"
import { IMedia } from "./media"

interface IComment extends IMedia {
    id: CommentId,
    from: UserId,
    target: MediaId,
    content: string,
}

function isMediaIsComment(media: IMedia): media is IComment {
    return (media as IComment)?.id instanceof CommentId &&
        (media as IComment)?.from instanceof UserId &&
        (media as IComment)?.target instanceof MediaId &&
        typeof (media as IComment)?.content === "string"
}

function queryRowToComment(row: any) {
    if (!("id" in row &&
        "from" in row &&
        "target" in row &&
        "content" in row &&
        "media_id" in row &&
        "moment" in row &&
        "is_edited" in row)) {
        throw new Error("Invalid query row to convert into IComment")
    }

    return {
        id: new CommentId(row.id),
        from: new UserId(row.from),
        target: new MediaId(row.target),
        content: row.content,
        mediaId: new MediaId(row.media_id),
        moment: new Moment(row.moment),
        isEdited: row.is_edited
    }
}

export { IComment, isMediaIsComment, queryRowToComment }
