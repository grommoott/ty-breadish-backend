"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDeleteRequest;
const bdClient_1 = __importDefault(require("@api/bdClient"));
function createDeleteRequest(entityName, requestName) {
    return async function (id) {
        try {
            const response = await bdClient_1.default.query(`delete from ${entityName} where id=${id}`);
            return response.rowCount == 1;
        }
        catch (e) {
            const msg = `Error in ${requestName} request: ` + e;
            console.error(msg);
            return new Error(msg, { cause: 500 });
        }
    };
}
