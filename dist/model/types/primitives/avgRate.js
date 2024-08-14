"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvgRate = void 0;
class AvgRate {
    _avgRate;
    get avgRate() {
        return this._avgRate;
    }
    toString() {
        return this._avgRate.toString();
    }
    toBDView() {
        return this._avgRate.toString();
    }
    serialize() {
        return this._avgRate.toString();
    }
    constructor(avgRate) {
        if (typeof avgRate === "string") {
            avgRate = parseFloat(avgRate);
        }
        let isValid = true;
        isValid = isValid && Math.round(avgRate) - avgRate == 0;
        isValid = isValid && (avgRate >= 1 && avgRate <= 5 || avgRate == -1);
        this._avgRate = avgRate;
    }
}
exports.AvgRate = AvgRate;
