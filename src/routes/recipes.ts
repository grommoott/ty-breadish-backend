import { Recipe } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { IRecipe } from "@interfaces"
import { checkAdmin, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { ItemInfo, RecipeId } from "@primitives"
import path from "path"

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
        checkBodyParams(["name", "description", "itemInfo"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const name: string = req.body.name
            const description: string = req.body.description
            const itemInfo: ItemInfo = req.body.itemInfo

            const recipe: Recipe | Error = await Recipe.create(name, description, itemInfo)

            if (recipe instanceof Error) {
                next(recipe)
                return
            }

            res.send(recipe.toNormalView())
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

            const recipe: Recipe | Error = await Recipe.fromId(id)

            if (recipe instanceof Error) {
                next(recipe)
                return
            }

            const edit: void | Error = await recipe.edit({ name, description, itemInfo })

            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public getImages: Array<Middleware> = [
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: RecipeId = new RecipeId(req.params.id)

            res.sendFile(path.join(__dirname, `../../data/images/recipes/${id}.webp`))

            next()
        })
    ]
}

export default new Recipes()
