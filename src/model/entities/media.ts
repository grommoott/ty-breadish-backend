import { IMedia, isMediaIsNew } from "@interfaces";
import { MediaId, Moment } from "@primitives";
import getMedia from "@api/get/getMedia";
import { Entity } from "./entity";

class Media extends Entity {

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

    public override toNormalView(): object {
        return {
            mediaId: this._media.mediaId.id,
            moment: this._media.moment.moment,
            idEdited: this._media.isEdited
        }
    }

    protected constructor({ mediaId, moment, isEdited }: IMedia) {
        super()

        this._media = { mediaId, moment, isEdited }
    }
}

export { Media }
