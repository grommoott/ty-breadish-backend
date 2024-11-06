import bdClient from "@api/bdClient";
import getNew from "@api/get/getNew";
import { isEmpty, pgFormat } from "@helpers";
import { INew } from "@interfaces";
import { NewId } from "@primitives";

export default async function updateNew(id: NewId, data: { title?: string, content?: string }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const newWithId: INew | Error = await getNew(id)

        if (newWithId instanceof Error) {
            return newWithId
        }

        const valueConverter: (key: string, value: string) => string = (_: string, value: string): string => {
            return `'${pgFormat(value)}'`
        }

        const setString = Object.entries(data).filter(([_, val]) => val != undefined).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`
        })

        await bdClient.query(`update news set ${setString}, is_edited=TRUE where id=${id}`)
    } catch (e) {
        const msg = "Error in updateNew request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
