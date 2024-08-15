import bdClient from "@api/bdClient";
import getMedia from "@api/get/getMedia";
import getUser from "@api/get/getUser";
import { pgFormat } from "@helpers";
import { IComment, IMedia, IUser, queryRowToComment } from "@interfaces";
import { CommentId, MediaId, Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createComment(from: UserId, target: MediaId, content: string, moment?: Moment): Promise<IComment | Error> {
    try {
        const userWithId: IUser | Error = await getUser(from)

        if (userWithId instanceof Error) {
            return userWithId
        }

        const mediaWithId: IMedia | Error = await getMedia(target)

        if (mediaWithId instanceof Error) {
            return mediaWithId
        }

        const _moment: Moment = (() => {
            if (!moment) {
                return new Moment(new Date().getTime())
            } else {
                return moment
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into comments values(default, nextval('media_id'), ${from}, ${target}, '${pgFormat(content)}', ${_moment}, false) returning *`)

        return queryRowToComment(response.rows[0])
    } catch (e) {
        const msg = "Error in createComment request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
