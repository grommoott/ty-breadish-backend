"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateSession;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getSession_1 = require("@api/get/getSession");
const _helpers_1 = require("@helpers");
async function updateSession(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const sessionWithId = await (0, getSession_1.getSession)(id);
        if (sessionWithId instanceof Error) {
            return sessionWithId;
        }
        const nameConverter = (name) => {
            switch (name) {
                case "refreshTokenId":
                    return "refresh_token_id";
                default:
                    return name;
            }
        };
        const valueConverter = (key, val) => {
            switch (key) {
                case "refreshTokenId":
                    return `'${(0, _helpers_1.pgFormat)(val)}'`;
                case "moment":
                    return val.toBDView();
                default:
                    return `${(0, _helpers_1.pgFormat)(val)}`;
            }
        };
        const setString = Object.entries(data).filter(([_, val]) => val != undefined).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`;
        }).join(", ");
        await bdClient_1.default.query(`update sessions set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateSession request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
