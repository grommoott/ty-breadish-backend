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
const deleteUser_1 = __importDefault(require("@api/delete/deleteUser"));
// Basic fields declaration and initialization
const app = (0, express_1.default)();
const port = process.env.PORT || 8443;
// Middleware connection
app.use((0, cors_1.default)());
app.get("/", async (_, res) => {
    res.send(await (0, deleteUser_1.default)(new _primitives_1.UserId(1)));
});
// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port);
});
