"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const _primitives_1 = require("@primitives");
async function createUser(username, passwordHash, email, moment = null) {
    try {
        const _moment = (() => {
            if (moment == null) {
                return new _primitives_1.Moment(new Date().getTime());
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into users values (default, '${username}', '${passwordHash}', '${email}', ${_moment}) returning *`);
        const user = response.rows[0];
        return {
            id: new _primitives_1.UserId(user.id),
            username: user.username,
            passwordHash: new _primitives_1.Hash(user.password_hash),
            email: new _primitives_1.Email(user.email),
            moment: new _primitives_1.Moment(user.moment)
        };
    }
    catch (e) {
        const msg = "Error in createUser request" + e;
        console.error(msg);
        return new Error(msg, { cause: 500 });
    }
}
