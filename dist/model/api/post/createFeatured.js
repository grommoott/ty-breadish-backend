"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createFeatured;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getItem_1 = __importDefault(require("@api/get/getItem"));
const getUser_1 = __importDefault(require("@api/get/getUser"));
const _interfaces_1 = require("@interfaces");
async function createFeatured(from, target, itemType) {
    try {
        const userWithId = await (0, getUser_1.default)(from);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const itemWithId = await (0, getItem_1.default)(target);
        if (itemWithId instanceof Error) {
            return itemWithId;
        }
        const featureds = await bdClient_1.default.query(`select * from featured where "from"=${from} and target=${target}`);
        if (featureds.rowCount != 0) {
            return new Error(`There is already featured from ${from} and with target ${target}`);
        }
        const response = await bdClient_1.default.query(`insert into featured values(default, ${from}, ${target}, ${itemType}) returning *`);
        return (0, _interfaces_1.queryRowToFeatured)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createFeatured request" + e;
        throw new Error(msg, { cause: 500 });
    }
}
