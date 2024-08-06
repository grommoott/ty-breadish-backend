"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
async function createUser(username, passwordHash, email, id = null, moment = null) {
    try {
        const _id = (() => {
            if (id === null) {
                return "(select count(*) from users)";
            }
            else {
                return id;
            }
        })();
        const _moment = (() => {
            if (moment == null) {
                return new Date().getTime();
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into users values (${_id}, '${username}', '${passwordHash}', '${email}', ${_moment}) returning *`);
        const user = response.rows[0];
        return {
            id: user.id,
            username: user.username,
            passwordHash: user.password_hash,
            email: user.email,
            moment: user.moment
        };
    }
    catch (e) {
        const msg = "Error in createUser request" + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
