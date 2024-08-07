import { QueryResult } from "pg";
import bdClient from "@api/bdClient.js";
import { IBDFeatured } from "@interfaces";
import { FeaturedId, ItemId, UserId } from "@primitives";

export default async function getUserFeatured(userId: UserId): Promise<Array<IBDFeatured> | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from featured where "from"=${userId}`)

        const result: Array<IBDFeatured> = new Array<IBDFeatured>()

        for (let featured of response.rows) {
            result.push({
                id: new FeaturedId(featured.id),
                from: new UserId(featured.from),
                target: new ItemId(featured.target),
                itemType: featured.item_type
            })
        }

        return result

    } catch (e) {
        const msg = "Error in getUserFeatured request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
