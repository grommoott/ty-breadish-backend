"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const item_1 = require("./item");
const _interfaces_1 = require("@interfaces");
const updateRecipe_1 = __importDefault(require("@api/put/updateRecipe"));
const deleteRecipe_1 = __importDefault(require("@api/delete/deleteRecipe"));
const getRecipes_1 = __importDefault(require("@api/get/getRecipes"));
const createRecipe_1 = __importDefault(require("@api/post/createRecipe"));
const getRecipe_1 = __importDefault(require("@api/get/getRecipe"));
const getItem_1 = __importDefault(require("@api/get/getItem"));
class Recipe extends item_1.Item {
    // Private fields
    _id;
    static _recipes;
    // Getters
    get id() {
        return this._id;
    }
    // Methods
    async edit(data) {
        return await (0, updateRecipe_1.default)(this._id, data);
    }
    async delete() {
        return await (0, deleteRecipe_1.default)(this._id);
    }
    // Static constructors
    static async fromId(id) {
        const recipe = await (0, getRecipe_1.default)(id);
        if (recipe instanceof Error) {
            return recipe;
        }
        return new Recipe(recipe);
    }
    static async fromItemId(id) {
        const item = await (0, getItem_1.default)(id);
        if (item instanceof Error) {
            return item;
        }
        if ((0, _interfaces_1.isItemIsProduct)(item)) {
            return new Error(`Item with this id(${id}) actually is a product, but not a recipe`);
        }
        return new Recipe(item);
    }
    static async getRecipes() {
        if (!this._recipes) {
            const recipes = await (0, getRecipes_1.default)();
            this._recipes = recipes.map(recipe => new Recipe(recipe));
        }
        return this._recipes;
    }
    static async create(name, description, itemInfo) {
        const recipe = await (0, createRecipe_1.default)(name, description, itemInfo);
        if (recipe instanceof Error) {
            return recipe;
        }
        return new Recipe(recipe);
    }
    toNormalView() {
        return {
            id: this.id.id,
            itemId: this.itemId.id,
            name: this.name,
            description: this.description,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo
        };
    }
    constructor({ id, itemId, name, description, avgRate, itemInfo }) {
        super({ itemId, name, description, avgRate, itemInfo });
        this._id = id;
    }
}
exports.Recipe = Recipe;
