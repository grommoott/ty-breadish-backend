import bdClient from "@api/bdClient";
import { IBDRecipe } from "@interfaces/recipe";
import { AvgRate, ItemId, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function getRecipes(): Promise<Array<IBDRecipe> | Error> {
    try {
        const response: QueryResult = await bdClient.query("select * from recipes")

        return response.rows.map((product): IBDRecipe => {
            return {
                id: new RecipeId(product.id),
                itemId: new ItemId(product.item_id),
                name: product.name,
                avgRate: new AvgRate(product.avg_rate)
            }
        })
    } catch (e) {
        const msg = "Error in getRecipes request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
