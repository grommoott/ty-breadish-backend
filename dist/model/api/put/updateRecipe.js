"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateRecipe;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getRecipe_1 = __importDefault(require("@api/get/getRecipe"));
const _helpers_1 = require("@helpers");
const _primitives_1 = require("@primitives");
async function updateRecipe(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const recipeWithId = await (0, getRecipe_1.default)(id);
        if (recipeWithId instanceof Error) {
            return recipeWithId;
        }
        const nameConverter = (name) => {
            switch (name) {
                case "itemInfo":
                    return "item_info";
                default:
                    return name;
            }
        };
        const valueConverter = (key, value) => {
            switch (key) {
                case "itemInfo":
                    return _primitives_1.ItemInfo.fromJSON(value).toBDView();
                default:
                    return `'${(0, _helpers_1.pgFormat)(value)}'`;
            }
        };
        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`;
        });
        await bdClient_1.default.query(`update recipes set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateRecipe request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
