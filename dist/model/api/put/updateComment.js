"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateComment;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getComment_1 = __importDefault(require("@api/get/getComment"));
const _helpers_1 = require("@helpers");
async function updateComment(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const commentWithId = await (0, getComment_1.default)(id);
        if (commentWithId instanceof Error) {
            return commentWithId;
        }
        const valueConverter = (_, value) => {
            return `'${(0, _helpers_1.pgFormat)(value)}'`;
        };
        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`;
        }).join(", ");
        await bdClient_1.default.query(`update comments set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateComment request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
