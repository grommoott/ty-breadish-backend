import { MediaId, Moment, NewId } from "@primitives"
import { IMedia } from "./media"

interface INew extends IMedia {
    id: NewId,
    title: string,
    content: string,
}

function isMediaIsNew(media: IMedia): media is INew {
    return (media as INew)?.id instanceof NewId &&
        typeof (media as INew)?.title === "string" &&
        typeof (media as INew)?.content === "string"
}

function queryRowToNew(row: any): INew {
    if (!(
        "id" in row &&
        "title" in row &&
        "content" in row &&
        "media_id" in row &&
        "moment" in row &&
        "is_edited" in row)) {
        throw new Error("Invalid query row to convert into INew")
    }

    return {
        id: new NewId(row.id),
        title: row.title,
        content: row.content,
        mediaId: new MediaId(row.media_id),
        moment: new Moment(row.moment),
        isEdited: row.is_edited
    }
}

export { INew, isMediaIsNew, queryRowToNew }
