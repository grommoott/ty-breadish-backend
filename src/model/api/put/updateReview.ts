import bdClient from "@api/bdClient";
import { isEmpty } from "@helpers";
import { IBDReview } from "@interfaces";
import { Rate, ReviewId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateReview(id: ReviewId, data: { content?: string, rate?: Rate }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const reviewWithId: QueryResult = await bdClient.query(`select count(*) from reviews where id=${id}`)

        if (reviewWithId.rows[0].count == 0) {
            return new Error(`There is no review with id ${id}`)
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            return `'${value}'`
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`
        }).join(", ")

        bdClient.query(`update reviews set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateReview request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
