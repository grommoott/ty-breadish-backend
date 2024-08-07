"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRecipe;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createRecipe(name, description, itemInfo) {
    try {
        const response = await bdClient_1.default.query(`insert into recipes values (default, nextval('item_id'), '${name}', '${description}', -1, '${itemInfo.toJSON()}') returning *`);
        const recipe = response.rows[0];
        return {
            id: new _primitives_1.RecipeId(recipe.id),
            itemId: new _primitives_1.ItemId(recipe.item_id),
            name: recipe.name,
            description: recipe.description,
            avgRate: new _primitives_1.AvgRate(recipe.avg_rate),
            itemInfo: _primitives_1.ItemInfo.fromJSON(recipe.item_info)
        };
    }
    catch (e) {
        const msg = "Error in createRecipe request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
