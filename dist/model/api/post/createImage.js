"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createImage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getImage_1 = __importDefault(require("@api/get/getImage"));
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
async function createImage(id, category, extension) {
    try {
        if (category === _enums_1.ImageCategories.Images) {
            return new Error("To create basic image use createBasicImage request");
        }
        const imageWithIdCategory = await (0, getImage_1.default)(id, category);
        if (!(imageWithIdCategory instanceof Error)) {
            return new Error(`Image with such id(${id}) in category ${category} is already exists`);
        }
        const response = await bdClient_1.default.query(`insert into images values (${id}, '${(0, _helpers_1.pgFormat)(category)}', '${(0, _helpers_1.pgFormat)(extension)}') returning *`);
        return (0, _interfaces_1.queryRowToImage)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createImage request: " + e;
        return new Error(msg, { cause: 500 });
    }
}
