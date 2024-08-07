import bdClient from "@api/bdClient";
import { IBDRecipe } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function getRecipes(): Promise<Array<IBDRecipe>> {
    try {
        const response: QueryResult = await bdClient.query("select * from recipes")

        return response.rows.map((recipe): IBDRecipe => {
            return {
                id: new RecipeId(recipe.id),
                itemId: new ItemId(recipe.item_id),
                name: recipe.name,
                description: recipe.description,
                avgRate: new AvgRate(recipe.avg_rate),
                itemInfo: ItemInfo.fromJSON(recipe.item_info)
            }
        })
    } catch (e) {
        const msg = "Error in getRecipes request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
