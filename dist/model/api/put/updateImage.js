"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateImage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getImage_1 = __importDefault(require("@api/get/getImage"));
const _helpers_1 = require("@helpers");
async function updateImage(id, category, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const image = await (0, getImage_1.default)(id, category);
        if (image instanceof Error) {
            return image;
        }
        await bdClient_1.default.query(`update images set extension='${(0, _helpers_1.pgFormat)(data.extension)}' where id=${id} and category='${(0, _helpers_1.pgFormat)(category)}'`);
    }
    catch (e) {
        const msg = "Error in updateImage request: " + e;
        return new Error(msg, { cause: 500 });
    }
}
