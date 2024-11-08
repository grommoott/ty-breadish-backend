"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBaker = void 0;
const jwt_1 = __importDefault(require("@helpers/jwt"));
const _enums_1 = require("@enums");
const checkBaker = (req, _, next) => {
    const accessToken = req.cookies?.AccessToken;
    if (!accessToken) {
        next(new Error("Unauthorized!", { cause: 401 }));
    }
    const accessTokenPayload = jwt_1.default.getAccessTokenPayload(accessToken);
    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload);
        return;
    }
    if (accessTokenPayload.role != _enums_1.Roles.Baker && accessTokenPayload.role != _enums_1.Roles.Admin) {
        next(new Error("You must have baker role to make this request", { cause: 403 }));
        return;
    }
    next();
};
exports.checkBaker = checkBaker;
