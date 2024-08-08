import bdClient from "@api/bdClient";
import { isEmpty } from "@helpers";
import { ItemInfo, RecipeId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateRecipe(id: RecipeId, data: { name: string, description: string, itemInfo: ItemInfo }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const recipeWithId: QueryResult = await bdClient.query(`select count(*) from recipes where id=${id}`)

        if (recipeWithId.rows[0].count == 0) {
            return new Error(`Recipe with id ${id} isn't exists`)
        }

        const nameConverter: (name: string) => string = (name: string): string => {
            switch (name) {
                case "itemInfo":
                    return "item_info"

                default:
                    return name
            }
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            switch (key) {
                case "itemInfo":
                    return (value as ItemInfo).toBDView()

                default:
                    return `'${value}'`
            }
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`
        })

        bdClient.query(`update recipes set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateRecipe request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
