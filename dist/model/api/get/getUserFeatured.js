"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserFeatured;
const bdClient_js_1 = __importDefault(require("@api/bdClient.js"));
const _primitives_1 = require("@primitives");
async function getUserFeatured(userId) {
    try {
        const response = await bdClient_js_1.default.query(`select * from featured where "from"=${userId}`);
        const result = new Array();
        for (let featured of response.rows) {
            result.push({
                id: new _primitives_1.FeaturedId(featured.id),
                from: new _primitives_1.UserId(featured.from),
                target: new _primitives_1.ItemId(featured.target),
                itemType: featured.item_type
            });
        }
        return result;
    }
    catch (e) {
        const msg = "Error in getUserFeatured request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
