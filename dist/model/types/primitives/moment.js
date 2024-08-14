"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moment = void 0;
class Moment {
    _moment;
    get moment() {
        return this._moment;
    }
    static now() {
        return new Moment(new Date().getTime());
    }
    toString() {
        return this._moment.toString();
    }
    toBDView() {
        return this._moment.toString();
    }
    serialize() {
        return this._moment.toString();
    }
    constructor(moment) {
        if (typeof moment === "string") {
            moment = parseInt(moment);
        }
        this._moment = moment;
    }
}
exports.Moment = Moment;
