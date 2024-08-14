"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, req, res, next) {
    if (error.cause === 500) {
        res.sendStatus(500);
    }
    else if (error.cause === 400) {
        res.sendStatus(400);
    }
    else if (error.cause === 401) {
        res.sendStatus(401);
    }
    else {
        res.sendStatus(400);
    }
    next(error);
}
