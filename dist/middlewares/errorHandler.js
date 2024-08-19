"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    res.sendStatus(error.cause || 400);
    if (error.cause === 500) {
        next(error);
    }
}
