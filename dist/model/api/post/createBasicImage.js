"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createBasicImage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
async function createBasicImage(extension) {
    try {
        const response = await bdClient_1.default.query(`insert into images values (default, nextval('image_id'), '${(0, _helpers_1.pgFormat)(_enums_1.ImageCategories.Images)}', '${(0, _helpers_1.pgFormat)(extension)}') returning *`);
        return (0, _interfaces_1.queryRowToImage)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createBasicImage request: " + e;
        return new Error(msg, { cause: 500 });
    }
}
