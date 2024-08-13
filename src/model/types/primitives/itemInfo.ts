import { CookingMethod } from "../enums/itemInfo/cookingMethod"
import { Ingredient } from "../enums/itemInfo/ingredient"
import { IBDPrimitive } from "./bdPrimitive"

type PFC = {
    kkal: number,
    protein: number,
    fat: number,
    carbs: number
}

type ItemInfoJson = {
    cooking_method: CookingMethod,
    ingredients: Ingredient[],
    pfc: {
        kkal: number,
        protein: number,
        fat: number,
        carbs: number
    }
}

class ItemInfo implements IBDPrimitive {
    public cookingMethod: CookingMethod

    public ingredients: Ingredient[]

    public pfc: PFC

    public static fromJSON(json: string): ItemInfo {
        const itemInfo: ItemInfoJson = JSON.parse(json)

        const pfc: PFC = { ...itemInfo.pfc }

        return new ItemInfo(itemInfo.cooking_method, itemInfo.ingredients, pfc)
    }

    public toJSON(): string {
        const itemInfo: ItemInfoJson = {
            cooking_method: this.cookingMethod,
            ingredients: this.ingredients,
            pfc: {
                kkal: this.pfc.kkal,
                protein: this.pfc.protein,
                fat: this.pfc.fat,
                carbs: this.pfc.carbs
            }
        }

        return JSON.stringify(itemInfo)
    }

    public toBDView(): string {
        return `'${this.toJSON().replaceAll("'", "''")}'`
    }

    public serialize(): string {
        return JSON.stringify(this)
    }

    public constructor(cookingMethod: CookingMethod, ingredients: Ingredient[], pfc: PFC) {
        this.cookingMethod = cookingMethod
        this.ingredients = ingredients
        this.pfc = pfc
    }
}

export { ItemInfo }
