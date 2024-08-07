import bdClient from "@api/bdClient";
import config from "@api/config";
import { IBDRecipe } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function createRecipe(name: string, description: string, itemInfo: ItemInfo, id: RecipeId | null = null): Promise<IBDRecipe | Error> {
    try {
        const _id: RecipeId | string = (() => {
            if (id === null) {
                return "((select id from recipes order by id desc limit 1) + 1)"
            } else {
                return id
            }
        })()

        const _itemId: ItemId | string = (() => {
            if (id === null) {
                return `(${_id as string} + ${config.itemIdRecipeOffset})`
            } else {
                return new ItemId((_id as RecipeId).id + config.itemIdRecipeOffset)
            }
        })()

        const response: QueryResult = await bdClient.query(`insert into recipes values (${_id}, ${_itemId}, '${name}', '${description}', -1, '${itemInfo.toJSON()}') returning *`)
        const recipe = response.rows[0]

        return {
            id: new RecipeId(recipe.id),
            itemId: new ItemId(recipe.item_id),
            name: recipe.name,
            description: recipe.description,
            avgRate: new AvgRate(recipe.avg_rate),
            itemInfo: ItemInfo.fromJSON(recipe.item_info)
        }
    } catch (e) {
        const msg = "Error in createRecipe request: " + e
        console.error(msg)
        return new Error(msg, { cause: 500 })
    }
}
