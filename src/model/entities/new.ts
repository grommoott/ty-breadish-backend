import getNewsPage from "@api/get/getNewsPage"
import { INew } from "@interfaces"
import { MediaId, Moment, NewId } from "@primitives"

class New {

    // Private fields

    private _new: INew

    // Getters

    public get id(): NewId {
        return this._new.id
    }

    public get title(): string {
        return this._new.title
    }

    public get content(): string {
        return this._new.content
    }

    public get mediaId(): MediaId {
        return this._new.mediaId
    }

    public get moment(): Moment {
        return this._new.moment
    }

    public get isEdited(): boolean {
        return this._new.isEdited
    }

    // Static constructors

    public static async getNewsPage(page: number): Promise<Array<New> | Error> {
        const news: Array<INew> | Error = await getNewsPage(page)

        if (news instanceof Error) {
            return news
        }

        return news.map(aNew => new New(aNew))
    }



    private constructor({ id, title, content, mediaId, moment, isEdited }: INew) {
        this._new = { id, title, content, mediaId, moment, isEdited }
    }
}

export { New }
