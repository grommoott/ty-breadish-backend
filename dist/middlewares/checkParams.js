"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParams = checkParams;
function checkParams(params) {
    return (req, _, next) => {
        for (const param of params) {
            if (!(param in req.params)) {
                next(new Error("Invalid request", { cause: 400 }));
                return;
            }
        }
        next();
    };
}
