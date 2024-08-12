import { IMedia, isMediaIsNew } from "@interfaces";
import { MediaId, Moment } from "@primitives";
import getMedia from "@api/get/getMedia";

class Media {

    // Private fields

    private _media: IMedia

    // Getters

    public get mediaId(): MediaId {
        return this._media.mediaId
    }

    public get moment(): Moment {
        return this._media.moment
    }

    public get isEdited(): boolean {
        return this._media.isEdited
    }

    // Static constructors

    public static async fromMediaId(id: MediaId): Promise<Media | Error> {
        const media: IMedia | Error = await getMedia(id)

        if (media instanceof Error) {
            return media
        }

        return new Media(media)
    }

    protected constructor({ mediaId, moment, isEdited }: IMedia) {
        this._media = { mediaId, moment, isEdited }
    }
}

export { Media }
