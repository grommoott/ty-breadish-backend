import bdClient from "@api/bdClient";
import { pgFormat } from "@helpers";
import { IRecipe, queryRowToRecipe } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function createRecipe(name: string, description: string, itemInfo: ItemInfo, recipe: string): Promise<IRecipe> {
    try {
        const response: QueryResult = await bdClient.query(`insert into recipes values (default, nextval('item_id'), '${pgFormat(name)}', '${pgFormat(description)}', -1, '${pgFormat(itemInfo.toJSON())}', '${pgFormat(recipe)}') returning *`)

        return queryRowToRecipe(response.rows[0])
    } catch (e) {
        const msg = "Error in createRecipe request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
