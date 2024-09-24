"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    if (error.cause === 500) {
        next(error);
    }
    res.statusMessage = error.message;
    res.sendStatus(error.cause || 400);
}
