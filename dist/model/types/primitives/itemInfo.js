"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInfo = void 0;
class ItemInfo {
    cookingMethod;
    ingredients;
    pfc;
    static fromJSON(json) {
        const itemInfo = JSON.parse(json);
        const pfc = { ...itemInfo.pfc };
        return new ItemInfo(itemInfo.cooking_method, itemInfo.ingredients, pfc);
    }
    toJSON() {
        const itemInfo = {
            cooking_method: this.cookingMethod,
            ingredients: this.ingredients,
            pfc: {
                kkal: this.pfc.kkal,
                protein: this.pfc.protein,
                fat: this.pfc.fat,
                carbs: this.pfc.carbs
            }
        };
        return JSON.stringify(itemInfo);
    }
    toBDView() {
        return `'${this.toJSON().replaceAll("'", "''")}'`;
    }
    serialize() {
        return JSON.stringify(this);
    }
    constructor(cookingMethod, ingredients, pfc) {
        this.cookingMethod = cookingMethod;
        this.ingredients = ingredients;
        this.pfc = pfc;
    }
}
exports.ItemInfo = ItemInfo;
