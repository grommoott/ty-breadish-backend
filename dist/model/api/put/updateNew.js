"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateNew;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getNew_1 = __importDefault(require("@api/get/getNew"));
const _helpers_1 = require("@helpers");
async function updateNew(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const newWithId = await (0, getNew_1.default)(id);
        if (newWithId instanceof Error) {
            return newWithId;
        }
        const valueConverter = (_, value) => {
            return `'${(0, _helpers_1.pgFormat)(value)}'`;
        };
        const setString = Object.entries(data).filter(([_, val]) => val != undefined).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`;
        });
        await bdClient_1.default.query(`update news set ${setString}, is_edited=TRUE where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateNew request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
