import bdClient from "@api/bdClient";
import { IRecipe, queryRowToRecipe } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function getRecipes(): Promise<Array<IRecipe>> {
    try {
        const response: QueryResult = await bdClient.query("select * from recipes")

        return response.rows.map(queryRowToRecipe)
    } catch (e) {
        const msg = "Error in getRecipes request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
