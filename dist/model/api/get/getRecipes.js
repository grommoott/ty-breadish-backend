"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getRecipes;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function getRecipes() {
    try {
        const response = await bdClient_1.default.query("select * from recipes");
        return response.rows.map(_interfaces_1.queryRowToRecipe);
    }
    catch (e) {
        const msg = "Error in getRecipes request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
