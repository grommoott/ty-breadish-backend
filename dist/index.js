"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
// Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Basic fields declaration and initialization
const app = (0, express_1.default)();
const port = process.env.PORT || 8443;
class LikeId {
    constructor() {
        return new Proxy(this, {
            get: (target, p, receiver) => {
                return 0;
            }
        });
    }
}
const like = new LikeId();
console.log(like);
// Middleware connection
app.use((0, cors_1.default)());
app.get("/", async (_, res) => {
    res.send("Hello world!");
});
// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port);
});
