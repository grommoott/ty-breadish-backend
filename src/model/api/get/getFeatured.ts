import { QueryResult } from "pg";
import bdClient from "@api/bdClient.js";
import { IBDFeatured } from "@interfaces/featured";
import { ItemType } from "@enums";

export default async function getFeatured(userId: number): Promise<Array<IBDFeatured> | null> {
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
        console.error("Error in getFeatured request:", e)
        return null
    }
}
