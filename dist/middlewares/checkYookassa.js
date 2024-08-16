"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkYookassa = void 0;
const checkYookassa = (req, res, next) => {
    console.log(req.url);
    next();
};
exports.checkYookassa = checkYookassa;
