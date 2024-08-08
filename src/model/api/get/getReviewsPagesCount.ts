import bdClient from "@api/bdClient"
import config from "@api/config"
import { IItem } from "@interfaces"
import { ItemId } from "@primitives"
import { QueryResult } from "pg"
import getItem from "./getItem"

export default async function getReviewsPagesCount(itemId: ItemId): Promise<number | Error> {
    try {
        const itemWithId: IItem | Error = await getItem(itemId)

        if (itemWithId instanceof Error) {
            return itemWithId
        }

        const response: QueryResult = await bdClient.query(`select count(*) from reviews where target=${itemId}`)

        return Math.ceil(response.rows[0].count / config.reviewsPageSize)
    } catch (e) {
        const msg = "Error in getReviewsPagesCount request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
