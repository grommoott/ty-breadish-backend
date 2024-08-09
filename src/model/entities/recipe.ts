import { ItemInfo, RecipeId } from "@primitives";
import { Item } from "./item";
import { IRecipe } from "@interfaces";
import updateRecipe from "@api/put/updateRecipe";
import deleteRecipe from "@api/delete/deleteRecipe";
import getRecipes from "@api/get/getRecipes";

class Recipe extends Item {

    // Private fields

    private _id: RecipeId

    // Getters

    public get id(): RecipeId {
        return this._id
    }

    // Methods

    public async edit(data: { name: string, description: string, itemInfo: ItemInfo }): Promise<void | Error> {
        return await updateRecipe(this._id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteRecipe(this._id)
    }

    // Static constructors

    public static async getRecipes(): Promise<Array<Recipe>> {
        const recipes: Array<IRecipe> = await getRecipes()

        return recipes.map(recipe => new Recipe(recipe))
    }

    private constructor({ id, itemId, name, description, avgRate, itemInfo }: IRecipe) {
        super({ itemId, name, description, avgRate, itemInfo })


        this._id = id
    }
}

export { Recipe }
