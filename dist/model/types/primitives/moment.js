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
    constructor(moment) {
        this._moment = moment;
    }
}
exports.Moment = Moment;
