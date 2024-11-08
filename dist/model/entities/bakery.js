"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bakery = void 0;
const entity_1 = require("./entity");
const createBakery_1 = __importDefault(require("@api/post/createBakery"));
const updateBakery_1 = __importDefault(require("@api/put/updateBakery"));
const deleteBakery_1 = __importDefault(require("@api/delete/deleteBakery"));
const getBakery_1 = __importDefault(require("@api/get/getBakery"));
const getBakeries_1 = __importDefault(require("@api/get/getBakeries"));
class Bakery extends entity_1.Entity {
    // Private fields
    _bakery;
    // Getters
    get id() {
        return this._bakery.id;
    }
    get address() {
        return this._bakery.address;
    }
    get coords() {
        return this._bakery.coords;
    }
    // Methods
    async edit(data) {
        return await (0, updateBakery_1.default)(this.id, data);
    }
    async delete() {
        return await (0, deleteBakery_1.default)(this.id);
    }
    // Static constructors
    static async fromId(id) {
        const response = await (0, getBakery_1.default)(id);
        if (response instanceof Error) {
            return response;
        }
        return new Bakery(response);
    }
    static async getList() {
        const response = await (0, getBakeries_1.default)();
        if (response instanceof Error) {
            return response;
        }
        return response.map(bakery => new Bakery(bakery));
    }
    static async create(address, coords) {
        const response = await (0, createBakery_1.default)(address, coords);
        if (response instanceof Error) {
            return response;
        }
        return new Bakery(response);
    }
    // Overrides
    toNormalView() {
        return {
            id: this.id.id,
            address: this.address,
            coords: this.coords.toNormalView()
        };
    }
    // Constructor
    constructor({ id, address, coords }) {
        super();
        this._bakery = { id, address, coords };
    }
}
exports.Bakery = Bakery;
