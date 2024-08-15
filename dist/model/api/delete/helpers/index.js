"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDeleteRequest;
const bdClient_1 = __importDefault(require("@api/bdClient"));
function createDeleteRequest(tableName, requestName) {
    return async function (id) {
        try {
            const response = await bdClient_1.default.query(`delete from ${tableName} where id=${id}`);
            return response.rowCount != 0;
        }
        catch (e) {
            const msg = `Error in ${requestName} request: ` + e;
            throw new Error(msg, { cause: 500 });
        }
    };
}
