"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
// Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const _primitives_1 = require("@primitives");
const createLike_1 = __importDefault(require("@api/post/createLike"));
const _enums_1 = require("@enums");
// Basic fields declaration and initialization
const app = (0, express_1.default)();
const port = process.env.PORT || 8443;
// Middleware connection
app.use((0, cors_1.default)());
app.get("/", async (_, res) => {
    res.send(await (0, createLike_1.default)(new _primitives_1.UserId(0), new _primitives_1.MediaId(0), _enums_1.LikeTypes.Media));
});
// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port);
});
