import bdClient from "@api/bdClient";
import { IBDRecipe } from "@interfaces/recipe";
import { QueryResult } from "pg";

export default async function getRecipes(): Promise<Array<IBDRecipe> | Error> {
    try {
        const response: QueryResult = await bdClient.query("select * from recipes")

        return response.rows.map(product => {
            return {
                id: product.id,
                itemId: product.item_id,
                name: product.name,
                avgRate: product.avg_rate
            }
        })
    } catch (e) {
        const msg = "Error in getRecipes request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
