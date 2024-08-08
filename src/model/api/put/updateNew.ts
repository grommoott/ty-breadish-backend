import bdClient from "@api/bdClient";
import { isEmpty } from "@helpers";
import { NewId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateNew(id: NewId, data: { content?: string, title?: string }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const newWithId: QueryResult = await bdClient.query(`select count(*) from news where id=${id}`)

        if (newWithId.rows[0].count == 0) {
            return new Error(`New with id ${id} isn't exists`)
        }

        const valueConverter: (key: string, value: string) => string = (_: string, value: string): string => {
            return `'${value}'`
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`
        })

        bdClient.query(`update news set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateNew request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
