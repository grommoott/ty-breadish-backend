import bdClient from "@api/bdClient";
import { IBDNew } from "@interfaces";
import { MediaId, Moment, NewId } from "@primitives";
import { QueryResult } from "pg";

export default async function createNew(title: string, content: string, moment: Moment | null = null): Promise<IBDNew> {
    try {
        const _moment: Moment = (() => {
            if (moment === null) {
                return Moment.now()
            } else {
                return moment
            }
        })()

        const request: QueryResult = await bdClient.query(`insert into news values (default, nextval('media_id'), '${title}', '${content}', ${_moment}, false) returning *`)
        const aNew = request.rows[0]

        return {
            id: new NewId(aNew.id),
            mediaId: new MediaId(aNew.media_id),
            title: aNew.title,
            content: aNew.content,
            moment: new Moment(aNew.moment),
            isEdited: aNew.is_edited
        }
    } catch (e) {
        const msg = "Error in createNew request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
