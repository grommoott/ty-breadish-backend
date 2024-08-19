"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRecipe;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
async function createRecipe(name, description, itemInfo, recipe) {
    try {
        const response = await bdClient_1.default.query(`insert into recipes values (default, nextval('item_id'), '${(0, _helpers_1.pgFormat)(name)}', '${(0, _helpers_1.pgFormat)(description)}', -1, '${(0, _helpers_1.pgFormat)(itemInfo.toJSON())}', '${(0, _helpers_1.pgFormat)(recipe)}') returning *`);
        return (0, _interfaces_1.queryRowToRecipe)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createRecipe request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
