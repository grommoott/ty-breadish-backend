"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coords = void 0;
const _helpers_1 = require("@helpers");
class Coords {
    _longitude;
    _latitude;
    get longitude() {
        return this._longitude;
    }
    get latitude() {
        return this._latitude;
    }
    static fromObject(object) {
        return new Coords(object[0], object[1]);
    }
    toString() {
        return `[${this.latitude},${this.longitude}]`;
    }
    toBDView() {
        return `'${(0, _helpers_1.pgFormat)(this.toString())}'`;
    }
    serialize() {
        return this.toString();
    }
    toNormalView() {
        return [this.latitude, this.longitude];
    }
    constructor(latitude, longitude) {
        this._latitude = latitude;
        this._longitude = longitude;
    }
}
exports.Coords = Coords;
