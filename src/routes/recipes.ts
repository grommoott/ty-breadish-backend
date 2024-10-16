import { Recipe } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { checkAdmin, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { ItemInfo, RecipeId } from "@primitives"
import images from "./images"
import { ImageCategories } from "@enums"

class Recipes {
    public getList: Array<Middleware> = [
        contentJson,
        asyncErrorCatcher(async (_, res, next) => {
            const recipes: Array<Recipe> = await Recipe.getRecipes()

            res.send(recipes.map(recipe => recipe.toListView()))

            next()
        })
    ]

    public get: Array<Middleware> = [
        checkParams(["id"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const id: RecipeId = new RecipeId(req.params.id)

            const recipe: Recipe | Error = await Recipe.fromId(id)

            if (recipe instanceof Error) {
                next(recipe)
                return
            }

            res.send(recipe.toNormalView())
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["name", "description", "itemInfo", "recipe"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const name: string = req.body.name
            const description: string = req.body.description
            const itemInfo = ItemInfo.fromJSON(req.body.itemInfo)
            const recipe: string = req.body.recipe

            const _recipe: Recipe | Error = await Recipe.create(name, description, itemInfo, recipe)

            if (_recipe instanceof Error) {
                next(_recipe)
                return
            }

            res.send(_recipe.toNormalView())
        })
    ]

    public delete: Array<Middleware> = [
        checkAdmin,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: RecipeId = new RecipeId(req.params.id)

            const recipe: Recipe | Error = await Recipe.fromId(id)

            if (recipe instanceof Error) {
                next(recipe)
                return
            }

            const del: boolean | Error = await recipe.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public put: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: RecipeId = new RecipeId(req.body.id)
            const name: string | undefined = req.body.name
            const description: string | undefined = req.body.description
            const itemInfo: ItemInfo | undefined = req.body.itemInfo
            const recipe: string | undefined = req.body.recipe

            const _recipe: Recipe | Error = await Recipe.fromId(id)

            if (_recipe instanceof Error) {
                next(_recipe)
                return
            }

            const edit: void | Error = await _recipe.edit({ name, description, itemInfo, recipe })

            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public getImages: Array<Middleware> = images.get(ImageCategories.Recipes)

    public postImages: Array<Middleware> = [
        checkAdmin,
        ...images.postCreate(ImageCategories.Recipes)
    ]

    public deleteImages: Array<Middleware> = [
        checkAdmin,
        ...images.delete(ImageCategories.Recipes)
    ]

    public putImages: Array<Middleware> = [
        checkAdmin,
        ...images.put(ImageCategories.Recipes)
    ]
}

export default new Recipes()
