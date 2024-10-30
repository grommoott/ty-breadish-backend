import bdClient from "@api/bdClient";
import getComment from "@api/get/getComment";
import { isEmpty, pgFormat } from "@helpers";
import { IComment } from "@interfaces";
import { CommentId } from "@primitives";

export default async function updateComment(id: CommentId, data: { content?: string }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const commentWithId: IComment | Error = await getComment(id)

        if (commentWithId instanceof Error) {
            return commentWithId
        }

        const valueConverter: (key: string, value: any) => string = (_: string, value: any): string => {
            return `'${pgFormat(value)}'`
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`
        }).join(", ")

        await bdClient.query(`update comments set ${setString}, is_edited=TRUE where id=${id}`)
    } catch (e) {
        const msg = "Error in updateComment request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
