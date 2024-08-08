import bdClient from "@api/bdClient";
import { isEmpty } from "@helpers";
import { CommentId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateComment(id: CommentId, data: { content?: string }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const commentWithId: QueryResult = await bdClient.query(`select count(*) from comments where id=${id}`)

        if (commentWithId.rows[0].count == 0) {
            return new Error(`There is no comment with id ${id}`)
        }

        const valueConverter: (key: string, value: any) => string = (_: string, value: any): string => {
            return `'${value}'`
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`
        }).join(", ")

        bdClient.query(`update comments set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateComment request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
