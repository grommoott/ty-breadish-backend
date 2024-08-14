import bdClient from "@api/bdClient";
import getReview from "@api/get/getReview";
import { isEmpty, pgFormat } from "@helpers";
import { IReview } from "@interfaces";
import { Rate, ReviewId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateReview(id: ReviewId, data: { content?: string, rate?: Rate }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const reviewsWithId: IReview | Error = await getReview(id)

        if (reviewsWithId instanceof Error) {
            return reviewsWithId
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            return `'${pgFormat(value)}'`
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
