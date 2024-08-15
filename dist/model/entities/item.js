"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const getItem_1 = __importDefault(require("@api/get/getItem"));
const entity_1 = require("./entity");
class Item extends entity_1.Entity {
    // Private fields
    _item;
    // Getters
    get itemId() {
        return this._item.itemId;
    }
    get name() {
        return this._item.name;
    }
    get description() {
        return this._item.description;
    }
    get avgRate() {
        return this._item.avgRate;
    }
    get itemInfo() {
        return this._item.itemInfo;
    }
    // Static constructors
    static async fromItemId(id) {
        const item = await (0, getItem_1.default)(id);
        if (item instanceof Error) {
            return item;
        }
        return new Item(item);
    }
    toNormalView() {
        return {
            itemId: this._item.itemId.id,
            name: this._item.name,
            description: this._item.description,
            avgRate: this._item.avgRate.avgRate,
            itemInfo: this._item.itemInfo
        };
    }
    constructor({ itemId, name, description, avgRate, itemInfo }) {
        super();
        this._item = { itemId, name, description, avgRate, itemInfo };
    }
}
exports.Item = Item;
