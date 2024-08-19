"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkYookassa = void 0;
const ips = new Array("77.75.154.206");
const checkYookassa = (req, res, next) => {
    const ip = req.header("true-client-ip")?.split(", ").pop();
    if (ips.findIndex((val) => val == ip) == -1) {
        next(new Error("Forbidden!", { cause: 403 }));
        return;
    }
    next();
};
exports.checkYookassa = checkYookassa;
