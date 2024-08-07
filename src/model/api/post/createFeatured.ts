import bdClient from "@api/bdClient";
import { ItemType } from "@enums";
import { IBDFeatured } from "@interfaces";
import { FeaturedId, ItemId, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createFeatured(from: UserId, target: ItemId, itemType: ItemType): Promise<IBDFeatured | Error> {
    try {
        const featureds: QueryResult = await bdClient.query(`select * from featured where "from"=${from} and target=${target}`)

        if (featureds.rowCount != 0) {
            return new Error(`There is already featured from ${from} and with target ${target}`)
        }

        const response: QueryResult = await bdClient.query(`insert into featured values(default, ${from}, ${target}, ${itemType}) returning *`)
        const featured = response.rows[0]

        return {
            id: new FeaturedId(featured.id),
            from: new UserId(featured.from),
            target: new ItemId(featured.target),
            itemType: featured.item_type
        }
    } catch (e) {
        const msg = "Error in createFeatured request" + e
        throw new Error(msg, { cause: 500 })
    }
}
