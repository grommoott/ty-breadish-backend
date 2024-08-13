"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getUserByEmail_1 = __importDefault(require("@api/get/getUserByEmail"));
const getUserByUsername_1 = __importDefault(require("@api/get/getUserByUsername"));
const _interfaces_1 = require("@interfaces");
const _primitives_1 = require("@primitives");
async function createUser(username, passwordHash, email, moment = null) {
    try {
        const usersWithUsername = await (0, getUserByUsername_1.default)(username);
        if (!(usersWithUsername instanceof Error)) {
            return new Error(`User with such username(${username}) is already exists`, { cause: 400 });
        }
        const usersWithEmail = await (0, getUserByEmail_1.default)(email);
        if (!(usersWithEmail instanceof Error)) {
            return new Error(`User with such email(${email}) is already exists`, { cause: 400 });
        }
        const _moment = (() => {
            if (moment == null) {
                return new _primitives_1.Moment(new Date().getTime());
            }
            else {
                return moment;
            }
        })();
        const response = await bdClient_1.default.query(`insert into users values (default, '${username}', '${passwordHash}', '${email}', ${_moment}) returning *`);
        return (0, _interfaces_1.queryRowToUser)(response.rows[0]);
    }
    catch (e) {
        const msg = "Error in createUser request" + e;
        return new Error(msg, { cause: 500 });
    }
}
