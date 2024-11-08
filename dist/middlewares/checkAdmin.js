"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const jwt_1 = __importDefault(require("@helpers/jwt"));
const _enums_1 = require("@enums");
const checkAdmin = (req, _, next) => {
    const accessToken = req.cookies?.AccessToken;
    if (!accessToken) {
        next(new Error("Unauthorized!", { cause: 401 }));
        return;
    }
    const accessTokenPayload = jwt_1.default.getAccessTokenPayload(req.cookies?.AccessToken);
    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload);
        return;
    }
    if (accessTokenPayload.role !== _enums_1.Roles.Admin) {
        next(new Error("You must have admin role to make this request", { cause: 403 }));
        return;
    }
    next();
};
exports.checkAdmin = checkAdmin;
