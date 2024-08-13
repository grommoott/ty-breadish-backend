"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateUser;
const bdClient_1 = __importDefault(require("@api/bdClient"));
const getUser_1 = __importDefault(require("@api/get/getUser"));
const getUserByEmail_1 = __importDefault(require("@api/get/getUserByEmail"));
const getUserByUsername_1 = __importDefault(require("@api/get/getUserByUsername"));
const _helpers_1 = require("@helpers");
async function updateUser(id, data) {
    try {
        if ((0, _helpers_1.isEmpty)(data)) {
            return new Error("There is nothing to do");
        }
        const userWithId = await (0, getUser_1.default)(id);
        if (userWithId instanceof Error) {
            return userWithId;
        }
        const username = data.username;
        const email = data.email;
        if (username) {
            const userWithUsername = await (0, getUserByUsername_1.default)(username);
            if (!(userWithUsername instanceof Error) && userWithUsername.id.id != id.id) {
                return new Error(`User with such username(${username}) is already exists`);
            }
        }
        if (email) {
            const userWithEmail = await (0, getUserByEmail_1.default)(email);
            if (!(userWithEmail instanceof Error) && userWithEmail.id.id != id.id) {
                return new Error(`User with such email(${email}) is already exists`);
            }
        }
        const nameConverter = (name) => {
            switch (name) {
                case "passwordHash":
                    return "password_hash";
                default:
                    return name;
            }
        };
        const valueConverter = (key, value) => {
            switch (key) {
                case "username":
                    return `'${value}'`;
                default:
                    return value.toBDView();
            }
        };
        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`;
        }).join(",");
        bdClient_1.default.query(`update users set ${setString} where id=${id} `);
    }
    catch (e) {
        throw new Error("Error in updateUser request: " + e, { cause: 500 });
    }
}
