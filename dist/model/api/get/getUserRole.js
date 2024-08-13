"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUserRole;
const getUser_1 = __importDefault(require("./getUser"));
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function getUserRole(id) {
    try {
        const userWithId = await (0, getUser_1.default)(id);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const response = await bdClient_1.default.query(`select * from roles where user=${id}`);
        return response.rows[0].role;
    }
    catch (e) {
        const msg = "Error in getUserRole request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
