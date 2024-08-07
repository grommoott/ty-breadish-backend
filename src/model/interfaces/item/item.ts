import { AvgRate, ItemId, ItemInfo } from "@primitives";

interface IItem {
    itemId: ItemId,
    name: string,
    description: string,
    avgRate: AvgRate,
    itemInfo: ItemInfo
}

export { IItem }
