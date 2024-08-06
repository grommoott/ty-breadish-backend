"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvgRate = void 0;
class AvgRate {
    _avgRate;
    get avgRate() {
        return this._avgRate;
    }
    constructor(avgRate) {
        let isValid = true;
        isValid = isValid && Math.round(avgRate) - avgRate == 0;
        isValid = isValid && avgRate >= 1 && avgRate <= 5;
        this._avgRate = avgRate;
    }
}
exports.AvgRate = AvgRate;
