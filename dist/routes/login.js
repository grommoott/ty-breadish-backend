"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
class Login {
    post = [
        (0, _middlewares_1.checkBodyParams)(["username", "password"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
        })
    ];
}
exports.default = new Login();
