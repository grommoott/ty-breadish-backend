import { AvgRate, ItemId, ItemInfo, RecipeId } from "@primitives"
import { IItem } from "./item"

interface IRecipe extends IItem {
    id: RecipeId,
    recipe: string
}

function isItemIsRecipe(item: IItem): item is IRecipe {
    return (item as IRecipe)?.id instanceof RecipeId
}

function queryRowToRecipe(row: any): IRecipe {
    if (!("id" in row &&
        "recipe" in row &&
        "item_id" in row &&
        "name" in row &&
        "description" in row &&
        "avg_rate" in row &&
        "item_info" in row)) {
        throw new Error("Invalid query row to convert into IRecipe")
    }

    return {
        id: new RecipeId(row.id),
        recipe: row.recipe,
        itemId: new ItemId(row.item_id),
        name: row.name,
        description: row.description,
        avgRate: new AvgRate(row.avg_rate),
        itemInfo: ItemInfo.fromJSON(row.item_info)
    }
}

export { IRecipe, isItemIsRecipe, queryRowToRecipe }
