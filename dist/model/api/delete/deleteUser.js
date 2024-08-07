"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deleteUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function deleteUser(id) {
    try {
        const response = await bdClient_1.default.query(`delete from users where id=${id}`);
        console.log(response);
        return true;
    }
    catch (e) {
        const msg = "Error in deleteUser request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
