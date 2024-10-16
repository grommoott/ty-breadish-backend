import bdClient from "@api/bdClient";
import getRecipe from "@api/get/getRecipe";
import { isEmpty, pgFormat } from "@helpers";
import { IRecipe } from "@interfaces";
import { ItemInfo, RecipeId } from "@primitives";

export default async function updateRecipe(id: RecipeId, data: { name?: string, description?: string, itemInfo?: ItemInfo, recipe?: string }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const recipeWithId: IRecipe | Error = await getRecipe(id)

        if (recipeWithId instanceof Error) {
            return recipeWithId
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
                    return ItemInfo.fromJSON(value as string).toBDView()

                default:
                    return `'${pgFormat(value)}'`
            }
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`
        })

        await bdClient.query(`update recipes set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateRecipe request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
