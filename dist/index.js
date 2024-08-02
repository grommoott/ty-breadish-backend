var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import express from "express";
import cors from "cors";
import getUser from "./model/api/get/getUser.js";
// Basic fields declaration and initialization
const app = express();
const port = process.env.PORT || 8443;
// Middleware connection
app.use(cors());
app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function*() {
    res.send(yield getUser(0));
}));
// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port);
});
