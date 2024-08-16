"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNew;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _helpers_1 = require("@helpers");
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createNew(title, content, moment) {
    try {
        const _moment = (() => {
            if (!moment) {
                return _primitives_1.Moment.now();
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into news values (default, nextval('media_id'), '${(0, _helpers_1.pgFormat)(title)}', '${(0, _helpers_1.pgFormat)(content)}', ${_moment}, false) returning *`);
        return (0, _interfaces_1.queryRowToNew)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createNew request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
