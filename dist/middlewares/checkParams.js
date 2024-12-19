"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParams = checkParams;
function checkParams(params) {
    console.log("checkParams");
    return (req, _, next) => {
        for (const param of params) {
            if (!(param in req.params)) {
                next(new Error(`Invalid request, ${param} isn't found in request params`, { cause: 400 }));
                return;
            }
        }
        next();
    };
}
