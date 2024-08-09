import getItem from "@api/get/getItem"
import { IItem } from "@interfaces"
import { AvgRate, ItemId, ItemInfo } from "@primitives"

class Item {

    // Private fields

    private _item: IItem

    // Getters

    public get itemId(): ItemId {
        return this._item.itemId
    }

    public get name(): string {
        return this._item.name
    }

    public get description(): string {
        return this._item.description
    }

    public get avgRate(): AvgRate {
        return this._item.avgRate
    }

    public get itemInfo(): ItemInfo {
        return this._item.itemInfo
    }

    // Static constructors

    public static async fromItemId(id: ItemId): Promise<Item | Error> {
        const item: IItem | Error = await getItem(id)

        if (item instanceof Error) {
            return item
        }

        return new Item(item)
    }

    protected constructor({ itemId, name, description, avgRate, itemInfo }: IItem) {
        this._item = { itemId, name, description, avgRate, itemInfo }
    }
}

export { Item }
