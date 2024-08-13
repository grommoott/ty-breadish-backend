import { ItemId, ItemInfo, RecipeId } from "@primitives";
import { Item } from "./item";
import { IItem, IRecipe, isItemIsProduct, isItemIsRecipe } from "@interfaces";
import updateRecipe from "@api/put/updateRecipe";
import deleteRecipe from "@api/delete/deleteRecipe";
import getRecipes from "@api/get/getRecipes";
import createRecipe from "@api/post/createRecipe";
import getRecipe from "@api/get/getRecipe";
import getItem from "@api/get/getItem";

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

    public static async fromId(id: RecipeId): Promise<Recipe | Error> {
        const recipe: IRecipe | Error = await getRecipe(id)

        if (recipe instanceof Error) {
            return recipe
        }

        return new Recipe(recipe)
    }

    public static override async fromItemId(id: ItemId): Promise<Recipe | Error> {
        const item: IItem | Error = await getItem(id)

        if (item instanceof Error) {
            return item
        }

        if (isItemIsProduct(item)) {
            return new Error(`Item with this id(${id}) actually is a product, but not a recipe`)
        }

        return new Recipe(item as IRecipe)
    }

    public static async getRecipes(): Promise<Array<Recipe>> {
        const recipes: Array<IRecipe> = await getRecipes()

        return recipes.map(recipe => new Recipe(recipe))
    }

    public static async create(name: string, description: string, itemInfo: ItemInfo): Promise<Recipe | Error> {
        const recipe: IRecipe | Error = await createRecipe(name, description, itemInfo)

        if (recipe instanceof Error) {
            return recipe
        }

        return new Recipe(recipe)
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.id.id,
            itemId: this.itemId.id,
            name: this.name,
            description: this.description,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo
        })
    }

    private constructor({ id, itemId, name, description, avgRate, itemInfo }: IRecipe) {
        super({ itemId, name, description, avgRate, itemInfo })


        this._id = id
    }
}

export { Recipe }
