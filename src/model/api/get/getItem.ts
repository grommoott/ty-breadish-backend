import bdClient from "@api/bdClient";
import { IProduct, IRecipe, queryRowToProduct, queryRowToRecipe } from "@interfaces";
import { AvgRate, ItemId, ItemInfo, Price, ProductId, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function getItem(id: ItemId): Promise<IProduct | IRecipe | Error> {
    try {
        const productWithId: QueryResult = await bdClient.query(`select * from products where item_id=${id}`)

        if (productWithId.rowCount == 1) {
            return queryRowToProduct(productWithId.rows[0])
        }

        const recipeWithId: QueryResult = await bdClient.query(`select * from recipes where item_id=${id}`)

        if (recipeWithId.rowCount == 1) {
            return queryRowToRecipe(recipeWithId.rows[0])
        }

        return new Error(`Item with such itemId(${id}) isn't exists`)
    } catch (e) {
        const msg = "Error in getItem request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
