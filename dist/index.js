"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
// Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const _routes_1 = require("@routes");
const _middlewares_1 = require("@middlewares");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const yookassa_1 = require("@helpers/yookassa");
const _primitives_1 = require("@primitives");
// Basic fields declaration and initialization
const app = (0, express_1.default)();
const port = process.env.PORT || 8443;
// Middleware connection
app.use((0, cors_1.default)({ credentials: true, origin: ["http://localhost:5173", "http://localhost:4173"] }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", _routes_1.apiRouter);
app.get("/", async (req, res) => {
    const payment = await yookassa_1.yookassaApi.createPayment(new _primitives_1.Price(100), "OK", "https://example.com");
    if (payment instanceof Error) {
        res.send("Error");
        return;
    }
    res.send(payment);
    return;
});
app.use(_middlewares_1.errorHandler);
// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port);
});
