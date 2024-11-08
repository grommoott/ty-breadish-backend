"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _helpers_1 = require("@helpers");
const maps_1 = require("@helpers/maps");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
class Maps {
    getTile = [
        (0, _middlewares_1.checkParams)(["x", "y", "z"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const x = parseInt(req.params.x);
            const y = parseInt(req.params.y);
            const z = parseInt(req.params.z);
            const response = await maps_1.mapsApi.getTile(x, y, z);
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.contentType("image/png");
            res.send(response);
            next();
        })
    ];
    getFromCoords = [
        (0, _middlewares_1.checkParams)(["longitude", "latitude"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const longitude = parseFloat(req.params.longitude);
            const latitude = parseFloat(req.params.latitude);
            const response = await maps_1.geocodingApi.fromCoords(new _primitives_1.Coords(latitude, longitude));
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.send(response);
            next();
        })
    ];
    getFromQuery = [
        (0, _middlewares_1.checkParams)(["query"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const query = req.params.query;
            const response = await maps_1.geocodingApi.fromQuery(query);
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.send(response.map(coord => coord.toNormalView()));
            next();
        })
    ];
}
exports.default = new Maps();
