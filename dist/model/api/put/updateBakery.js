"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateBakery;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getBakery_1 = __importDefault(require("@api/get/getBakery"));
const _helpers_1 = require("@helpers");
async function updateBakery(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const bakeryWithId = await (0, getBakery_1.default)(id);
        if (bakeryWithId instanceof Error) {
            return bakeryWithId;
        }
        const valueConverter = (key, value) => {
            switch (key) {
                case "coords":
                    return value.toBDView();
                default:
                    return `'${(0, _helpers_1.pgFormat)(value)}'`;
            }
        };
        const setString = Object.entries(data).filter(([_, val]) => val != undefined).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`;
        }).join(", ");
        await bdClient_1.default.query(`update bakeries set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateBakery request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
