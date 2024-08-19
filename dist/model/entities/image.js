"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const deleteImage_1 = __importDefault(require("@api/delete/deleteImage"));
const getImage_1 = __importDefault(require("@api/get/getImage"));
const createImage_1 = __importDefault(require("@api/post/createImage"));
class Image {
    // Private fields
    _image;
    // Getters
    get id() {
        return this._image.id;
    }
    get category() {
        return this._image.category;
    }
    get extension() {
        return this._image.extension;
    }
    // Methods
    async delete() {
        return await (0, deleteImage_1.default)(this._image.id, this._image.category);
    }
    // Static constructors
    async fromIdCategory(id, category) {
        const image = await (0, getImage_1.default)(id, category);
        if (image instanceof Error) {
            return image;
        }
        return new Image(image);
    }
    async create(id, category, extension) {
        const image = await (0, createImage_1.default)(id, category, extension);
        if (image instanceof Error) {
            return image;
        }
        return new Image(image);
    }
    constructor({ id, category, extension }) {
        this._image = { id, category, extension };
    }
}
exports.Image = Image;
