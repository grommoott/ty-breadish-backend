"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createSimpleGetRequest;
const bdClient_1 = __importDefault(require("@api/bdClient"));
function createSimpleGetRequest(tableName, entityName, parseQueryRow) {
    return async function (id) {
        try {
            const response = await bdClient_1.default.query(`select * from ${tableName} where id=${id}`);
            if (response.rowCount == 0) {
                return new Error(`${entityName} with such id(${id}) isn't exists`);
            }
            return parseQueryRow(response.rows[0]);
        }
        catch (e) {
            const msg = `Error in get${entityName} request: ` + e;
            throw new Error(msg, { cause: 500 });
        }
    };
}
