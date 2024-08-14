"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatcher = errorCatcher;
exports.asyncErrorCatcher = asyncErrorCatcher;
function asyncErrorCatcher(middleware) {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next);
        }
        catch (e) {
            next(e);
        }
    };
}
function errorCatcher(middleware) {
    return async (req, res, next) => {
        try {
            middleware(req, res, next);
        }
        catch (e) {
            next(e);
        }
    };
}
