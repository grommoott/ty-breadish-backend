"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const images_1 = __importDefault(require("./images"));
const _enums_1 = require("@enums");
class Recipes {
    getList = [
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (_, res, next) => {
            const recipes = await _entities_1.Recipe.getRecipes();
            res.send(recipes.map(recipe => recipe.toListView()));
            next();
        })
    ];
    get = [
        (0, _middlewares_1.checkParams)(["id"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.RecipeId(req.params.id);
            const recipe = await _entities_1.Recipe.fromId(id);
            if (recipe instanceof Error) {
                next(recipe);
                return;
            }
            res.send(recipe.toNormalView());
        })
    ];
    postCreate = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["name", "description", "itemInfo", "recipe"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const name = req.body.name;
            const description = req.body.description;
            const itemInfo = _primitives_1.ItemInfo.fromJSON(req.body.itemInfo);
            const recipe = req.body.recipe;
            const _recipe = await _entities_1.Recipe.create(name, description, itemInfo, recipe);
            if (_recipe instanceof Error) {
                next(_recipe);
                return;
            }
            res.send(_recipe.toNormalView());
        })
    ];
    delete = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.RecipeId(req.params.id);
            const recipe = await _entities_1.Recipe.fromId(id);
            if (recipe instanceof Error) {
                next(recipe);
                return;
            }
            const del = await recipe.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    put = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.RecipeId(req.body.id);
            const name = req.body.name;
            const description = req.body.description;
            const itemInfo = req.body.itemInfo;
            const recipe = req.body.recipe;
            const _recipe = await _entities_1.Recipe.fromId(id);
            if (_recipe instanceof Error) {
                next(_recipe);
                return;
            }
            const edit = await _recipe.edit({ name, description, itemInfo, recipe });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    getImages = images_1.default.get(_enums_1.ImageCategories.Recipes);
    getIsImageExists = images_1.default.getIsExists(_enums_1.ImageCategories.Recipes);
    postImages = [
        _middlewares_1.checkAdmin,
        ...images_1.default.postCreate(_enums_1.ImageCategories.Recipes)
    ];
    deleteImages = [
        _middlewares_1.checkAdmin,
        ...images_1.default.delete(_enums_1.ImageCategories.Recipes)
    ];
    putImages = [
        _middlewares_1.checkAdmin,
        ...images_1.default.put(_enums_1.ImageCategories.Recipes)
    ];
}
exports.default = new Recipes();
