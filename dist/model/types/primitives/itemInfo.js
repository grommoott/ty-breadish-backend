"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInfo = void 0;
const _helpers_1 = require("@helpers");
class ItemInfo {
    cookingMethod;
    ingredients;
    pfc;
    static fromJSON(json) {
        const itemInfo = JSON.parse(json);
        const pfc = { ...itemInfo.pfc };
        return new ItemInfo(itemInfo.cooking_method, itemInfo.ingredients, pfc);
    }
    static fromObject(obj) {
        return new ItemInfo(obj.cooking_method, obj.ingredients, obj.pfc);
    }
    toJSON() {
        const itemInfo = this.toNormalView();
        return JSON.stringify(itemInfo);
    }
    toBDView() {
        return `'${(0, _helpers_1.pgFormat)(this.toJSON())}'`;
    }
    serialize() {
        return this.toJSON();
    }
    toNormalView() {
        return {
            cookingMethod: this.cookingMethod,
            ingredients: this.ingredients,
            pfc: this.pfc
        };
    }
    constructor(cookingMethod, ingredients, pfc) {
        this.cookingMethod = cookingMethod;
        this.ingredients = ingredients;
        this.pfc = pfc;
    }
}
exports.ItemInfo = ItemInfo;