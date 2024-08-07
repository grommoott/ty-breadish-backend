"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createFeatured;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createFeatured(from, target, itemType) {
    try {
        const featureds = await bdClient_1.default.query(`select * from featured where "from"=${from} and target=${target}`);
        if (featureds.rowCount != 0) {
            return null;
        }
        const response = await bdClient_1.default.query(`insert into featured values(default, ${from}, ${target}, ${itemType}) returning *`);
        const featured = response.rows[0];
        return {
            id: new _primitives_1.FeaturedId(featured.id),
            from: new _primitives_1.UserId(featured.from),
            target: new _primitives_1.ItemId(featured.target),
            itemType: featured.item_type
        };
    }
    catch (e) {
        const msg = "Error in createFeatured request" + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
