"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatcher = errorCatcher;
function errorCatcher(req, res, next) {
    try {
        console.log("start catching");
        next();
    }
    catch (e) {
        console.log("catched!");
        next(e);
    }
}
