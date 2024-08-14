"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentJson = void 0;
const contentJson = (_, res, next) => {
    res.header("Content-Type", "application/json");
    next();
};
exports.contentJson = contentJson;
