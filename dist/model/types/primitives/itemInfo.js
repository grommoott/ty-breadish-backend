"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInfo = void 0;
const _helpers_1 = require("@helpers");
class ItemInfo {
    cookingMethod;
    ingredients;
    pfc;
    mass;
    static fromJSON(json) {
        const itemInfo = JSON.parse(json);
        const pfc = { ...itemInfo.pfc };
        return new ItemInfo(itemInfo.cookingMethod, itemInfo.ingredients, pfc, itemInfo.mass);
    }
    static fromObject(obj) {
        return new ItemInfo(obj.cookingMethod, obj.ingredients, obj.pfc, obj.mass);
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
            pfc: this.pfc,
            mass: this.mass
        };
    }
    constructor(cookingMethod, ingredients, pfc, mass) {
        this.cookingMethod = cookingMethod;
        this.ingredients = ingredients;
        this.pfc = pfc;
        this.mass = mass;
    }
}
exports.ItemInfo = ItemInfo;
