"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const path_1 = __importDefault(require("path"));
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
        (0, _middlewares_1.checkBodyParams)(["name", "description", "itemInfo"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const name = req.body.name;
            const description = req.body.description;
            const itemInfo = req.body.itemInfo;
            const recipe = await _entities_1.Recipe.create(name, description, itemInfo);
            if (recipe instanceof Error) {
                next(recipe);
                return;
            }
            res.send(recipe.toNormalView());
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
        (0, _middlewares_1.checkBodyParams)(["id", "name", "description", "itemInfo"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.RecipeId(req.body.id);
            const name = req.body.name;
            const description = req.body.description;
            const itemInfo = req.body.itemInfo;
            const recipe = await _entities_1.Recipe.fromId(id);
            if (recipe instanceof Error) {
                next(recipe);
                return;
            }
            const edit = await recipe.edit({ name, description, itemInfo });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    getImages = [
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.RecipeId(req.params.id);
            res.sendFile(path_1.default.join(__dirname, `../../data/images/recipes/${id}.webp`));
            next();
        })
    ];
}
exports.default = new Recipes();
