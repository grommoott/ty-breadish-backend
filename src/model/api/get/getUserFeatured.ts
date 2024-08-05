import { QueryResult } from "pg";
import bdClient from "@api/bdClient.js";
import { IBDFeatured } from "@interfaces/featured";
import { ItemType } from "@enums";

export default async function getUserFeatured(userId: number): Promise<Array<IBDFeatured> | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from featured where "from"=${userId}`)

        const result: Array<IBDFeatured> = new Array<IBDFeatured>()

        for (let featured of response.rows) {
            result.push({
                id: featured.id,
                from: featured.from,
                target: featured.target,
                itemType: (() => {
                    switch (featured.item_type) {
                        case "product":
                            return ItemType.Product

                        case "recipe":
                            return ItemType.Recipe
                    }

                    return ItemType.Product
                })()
            })
        }

        return result

    } catch (e) {
        const msg = "Error in getUserFeatured request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
