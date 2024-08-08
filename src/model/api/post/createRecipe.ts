import bdClient from "@api/bdClient";
import { IRecipe, queryRowToRecipe } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function createRecipe(name: string, description: string, itemInfo: ItemInfo): Promise<IRecipe> {
    try {
        const response: QueryResult = await bdClient.query(`insert into recipes values (default, nextval('item_id'), '${name}', '${description}', -1, '${itemInfo.toJSON()}') returning *`)

        return queryRowToRecipe(response.rows[0])
    } catch (e) {
        const msg = "Error in createRecipe request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
