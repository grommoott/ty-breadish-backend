"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const products_1 = __importDefault(require("./products"));
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
apiRouter.post("/register", register_1.default.post);
apiRouter.post("/register/token", register_1.default.postToken);
apiRouter.post("/login", login_1.default.post);
apiRouter.get("/products/list", products_1.default.getList);
