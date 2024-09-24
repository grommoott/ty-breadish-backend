"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueryParams = checkQueryParams;
function checkQueryParams(params) {
    return (req, _, next) => {
        for (let param of params) {
            if (!(param in req.query)) {
                next(new Error(`Invalid request, ${param} isn't found in query params`, { cause: 400 }));
                return;
            }
        }
        next();
    };
}
