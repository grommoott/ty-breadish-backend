"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserFeatured;
const bdClient_js_1 = __importDefault(require("@api/bdClient.js"));
const _enums_1 = require("@enums");
async function getUserFeatured(userId) {
    try {
        const response = await bdClient_js_1.default.query(`select * from featured where "from"=${userId}`);
        const result = new Array();
        for (let featured of response.rows) {
            result.push({
                id: featured.id,
                from: featured.from,
                target: featured.target,
                itemType: (() => {
                    switch (featured.item_type) {
                        case "product":
                            return _enums_1.ItemType.Product;
                        case "recipe":
                            return _enums_1.ItemType.Recipe;
                    }
                    return _enums_1.ItemType.Product;
                })()
            });
        }
        return result;
    }
    catch (e) {
        const msg = "Error in getUserFeatured request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
