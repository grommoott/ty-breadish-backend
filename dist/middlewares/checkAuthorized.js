"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorized = void 0;
const jwt_1 = __importDefault(require("@helpers/jwt"));
const checkAuthorized = (req, _, next) => {
    if (!req.cookies.AccessToken) {
        next(new Error("Unauthorized", { cause: 401 }));
        return;
    }
    const accessTokenPayload = jwt_1.default.getAccessTokenPayload(req.cookies.AccessToken);
    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload);
        return;
    }
    req.body.accessTokenPayload = accessTokenPayload;
    next();
};
exports.checkAuthorized = checkAuthorized;
