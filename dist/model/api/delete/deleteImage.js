"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteImage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const getImage_1 = __importDefault(require("@api/get/getImage"));
const _helpers_1 = require("@helpers");
async function deleteImage(id, category) {
    try {
        const image = await (0, getImage_1.default)(id, category);
        if (image instanceof Error) {
            return image;
        }
        await promises_1.default.rm(path_1.default.join(__dirname, `../../../../data/images/${category}/${id}.${image.extension}`));
        const response = await bdClient_1.default.query(`delete from images where id=${id} and category='${(0, _helpers_1.pgFormat)(category)}'`);
        return response.rowCount != 0;
    }
    catch (e) {
        const msg = "Error in deleteImage request: " + e;
        return new Error(msg, { cause: 500 });
    }
}
