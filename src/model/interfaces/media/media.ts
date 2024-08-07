import { MediaId, Moment } from "@primitives";

interface IMedia {
    mediaId: MediaId,
    moment: Moment,
    isEdited: boolean
}

export { IMedia }
