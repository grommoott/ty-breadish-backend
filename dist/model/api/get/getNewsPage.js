"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNewsPage;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const config_1 = __importDefault(require("@api/config"));
const _primitives_1 = require("@primitives");
async function getNewsPage(page) {
    try {
        const response = await bdClient_1.default.query(`select * from news order by moment desc limit ${config_1.default.newsPageSize} offset ${config_1.default.newsPageSize * page}`);
        return response.rows.map(aNew => {
            return {
                id: new _primitives_1.NewId(aNew.id),
                mediaId: new _primitives_1.MediaId(aNew.media_id),
                title: aNew.title,
                content: aNew.content,
                moment: new _primitives_1.Moment(aNew.moment)
            };
        });
    }
    catch (e) {
        const msg = "Error in getNewsPage request: " + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
