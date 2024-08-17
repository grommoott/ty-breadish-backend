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
    private _recipe: string

    private static _recipes: Array<Recipe> | undefined

    // Getters

    public get id(): RecipeId {
        return this._id
    }

    public get recipe(): string {
        return this._recipe
    }

    // Methods

    public async edit(data: { name?: string, description?: string, itemInfo?: ItemInfo, recipe?: string }): Promise<void | Error> {
        return await updateRecipe(this._id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteRecipe(this._id)
    }

    public toListView(): object {
        return {
            id: this.id.id,
            itemId: this.itemId.id,
            name: this.name,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo
        }
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
        if (!this._recipes) {
            const recipes: Array<IRecipe> = await getRecipes()

            this._recipes = recipes.map(recipe => new Recipe(recipe))
        }

        return this._recipes
    }

    public static async create(name: string, description: string, itemInfo: ItemInfo, recipe: string): Promise<Recipe | Error> {
        const _recipe: IRecipe | Error = await createRecipe(name, description, itemInfo, recipe)

        if (_recipe instanceof Error) {
            return _recipe
        }

        return new Recipe(_recipe)
    }

    public override toNormalView(): object {
        return {
            id: this.id.id,
            itemId: this.itemId.id,
            name: this.name,
            description: this.description,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo,
            recipe: this.recipe
        }
    }

    private constructor({ id, itemId, name, description, avgRate, itemInfo, recipe }: IRecipe) {
        super({ itemId, name, description, avgRate, itemInfo })

        this._id = id
        this._recipe = recipe
    }
}

export { Recipe }
