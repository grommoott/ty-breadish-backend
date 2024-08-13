"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRecipe;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _interfaces_1 = require("@interfaces");
async function createRecipe(name, description, itemInfo) {
    try {
        const response = await bdClient_1.default.query(`insert into recipes values (default, nextval('item_id'), '${name}', '${description}', -1, '${itemInfo.toJSON()}') returning *`);
        return (0, _interfaces_1.queryRowToRecipe)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createRecipe request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
