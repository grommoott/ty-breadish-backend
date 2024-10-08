"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyParams = checkBodyParams;
function checkBodyParams(params) {
    return (req, _, next) => {
        for (let param of params) {
            if (!(param in req.body)) {
                next(new Error(`Invalid request, ${param} isn't found in request body`, { cause: 400 }));
                return;
            }
        }
        next();
    };
}
