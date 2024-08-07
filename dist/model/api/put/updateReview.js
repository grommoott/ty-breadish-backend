"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateReview;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function updateReview(id, data) {
    try {
        const reviewWithId = await bdClient_1.default.query(`select * from reviews where id=${id}`);
        if (reviewWithId.rowCount == 0) {
            return new Error(`There is no review with id ${id}`);
        }
        const valueConverter = (key, value) => {
            return `'${value}'`;
        };
        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`;
        }).join(", ");
        bdClient_1.default.query(`update reviews set ${setString} where id=${id}`);
    }
    catch (e) {
        const msg = "Error in updateReview request: " + e;
        throw new Error(msg, { cause: 500 });
    }
}
