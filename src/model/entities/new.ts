import getMedia from "@api/get/getMedia"
import getNew from "@api/get/getNew"
import getNewsPage from "@api/get/getNewsPage"
import { IMedia, INew, isMediaIsComment } from "@interfaces"
import { MediaId, Moment, NewId } from "@primitives"
import { Media } from "./media"
import updateNew from "@api/put/updateNew"
import deleteNew from "@api/delete/deleteNew"
import createNew from "@api/post/createNew"

class New extends Media {

    // Private fields

    private _id: NewId
    private _title: string
    private _content: string

    // Getters

    public get id(): NewId {
        return this._id
    }

    public get title(): string {
        return this._title
    }

    public get content(): string {
        return this._content
    }

    // Methods

    public async edit(data: { title: string, content: string }): Promise<void | Error> {
        return await updateNew(this._id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteNew(this._id)
    }

    // Static constructors

    public static async getNewsPage(page: number): Promise<Array<New> | Error> {
        const news: Array<INew> | Error = await getNewsPage(page)

        if (news instanceof Error) {
            return news
        }

        return news.map(aNew => new New(aNew))
    }

    public static async fromId(id: NewId): Promise<New | Error> {
        const aNew: INew | Error = await getNew(id)

        if (aNew instanceof Error) {
            return aNew
        }

        return new New(aNew)
    }

    public static override async fromMediaId(id: MediaId): Promise<New | Error> {
        const media: IMedia | Error = await getMedia(id)

        if (media instanceof Error) {
            return media
        }

        if (isMediaIsComment(media)) {
            return new Error(`Media with this id(${id}) actually is a comment, but not a new`)
        }

        return new New(media as INew)
    }

    public static async create(title: string, content: string): Promise<New | Error> {
        const aNew: INew | Error = await createNew(title, content)

        if (aNew instanceof Error) {
            return aNew
        }

        return new New(aNew)
    }

    public override serialize(): string {
        return JSON.stringify({
            id: this.id.id,
            title: this.title,
            content: this.content,
            mediaId: this.mediaId.id,
            moment: this.moment.moment,
            isEdited: this.isEdited
        })
    }

    private constructor({ id, title, content, mediaId, moment, isEdited }: INew) {
        super({ mediaId, moment, isEdited })

        this._id = id
        this._title = title
        this._content = content
    }
}

export { New }
