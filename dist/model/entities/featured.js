"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Featured = void 0;
const deleteFeatured_1 = __importDefault(require("@api/delete/deleteFeatured"));
const getFeatured_1 = __importDefault(require("@api/get/getFeatured"));
const getUserFeatured_1 = __importDefault(require("@api/get/getUserFeatured"));
const createFeatured_1 = __importDefault(require("@api/post/createFeatured"));
const entity_1 = require("./entity");
class Featured extends entity_1.Entity {
    // Private fields
    _featured;
    // Getters
    get id() {
        return this._featured.id;
    }
    get from() {
        return this._featured.from;
    }
    get target() {
        return this._featured.target;
    }
    get itemType() {
        return this._featured.itemType;
    }
    // Methods
    async delete() {
        return await (0, deleteFeatured_1.default)(this._featured.id);
    }
    // Static constructors
    static async fromId(id) {
        const featured = await (0, getFeatured_1.default)(id);
        if (featured instanceof Error) {
            return featured;
        }
        return new Featured(featured);
    }
    static async fromUser(id) {
        const featured = await (0, getUserFeatured_1.default)(id);
        if (featured instanceof Error) {
            return featured;
        }
        return featured.map(featured => new Featured(featured));
    }
    static async create(from, target, itemType) {
        const featured = await (0, createFeatured_1.default)(from, target, itemType);
        if (featured instanceof Error) {
            return featured;
        }
        return new Featured(featured);
    }
    serialize() {
        return JSON.stringify({
            id: this._featured.id.id,
            from: this._featured.from.id,
            target: this._featured.target.id,
            itemType: this._featured.itemType
        });
    }
    constructor({ id, from, target, itemType }) {
        super();
        this._featured = { id, from, target, itemType };
    }
}
exports.Featured = Featured;
