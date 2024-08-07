import bdClient from "@api/bdClient";
import { ItemType } from "@enums";
import { IBDFeatured } from "@interfaces";
import { FeaturedId, ItemId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createFeatured(from: UserId, target: ItemId, itemType: ItemType, id: FeaturedId | null = null): Promise<IBDFeatured | Error | null> {
    try {
        const featureds: QueryResult = await bdClient.query(`select * from featured where "from"=${from} and target=${target}`)

        if (featureds.rowCount != 0) {
            return null
        }

        const _id: string | FeaturedId = (() => {
            if (id === null) {
                return "((select id from featured order by id desc limit 1) + 1)"
            } else {
                return id
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into featured values(${_id}, ${from}, ${target}, ${itemType}) returning *`)
        const featured = response.rows[0]

        return {
            id: new FeaturedId(featured.id),
            from: new UserId(featured.from),
            target: new ItemId(featured.target),
            itemType: featured.item_type
        }
    } catch (e) {
        const msg = "Error in createFeatured request" + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
