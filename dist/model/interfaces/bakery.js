"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRowToBakery = queryRowToBakery;
const _primitives_1 = require("@primitives");
function queryRowToBakery(row) {
    if (!("id" in row && "address" in row && "coords" in row)) {
        throw new Error("Invalid query row to convert into IBakery");
    }
    return {
        id: new _primitives_1.BakeryId(row.id),
        address: row.address,
        coords: _primitives_1.Coords.fromObject(row.coords)
    };
}
