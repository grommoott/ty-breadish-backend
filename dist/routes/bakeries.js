"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const _entities_1 = require("@entities");
const _primitives_2 = require("@primitives");
class Bakeries {
    get = [
        (0, _middlewares_1.checkParams)(["id"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.BakeryId(req.params.id);
            const response = await _entities_1.Bakery.fromId(id);
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.send(response.toNormalView());
            next();
        })
    ];
    getList = [
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const response = await _entities_1.Bakery.getList();
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.send(response.map(bakery => bakery.toNormalView()));
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["address", "coords"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const address = req.body.address;
            const coords = _primitives_2.Coords.fromObject(req.body.coords);
            const response = await _entities_1.Bakery.create(address, coords);
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.send(response.toNormalView());
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.BakeryId(req.body.id);
            const bakery = await _entities_1.Bakery.fromId(id);
            if (bakery instanceof Error) {
                next(bakery);
                return;
            }
            const response = await bakery.delete();
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    put = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.BakeryId(req.body.id);
            const address = req.body?.address;
            const coords = req.body?.coords ? _primitives_2.Coords.fromObject(req.body?.coords) : undefined;
            const bakery = await _entities_1.Bakery.fromId(id);
            if (bakery instanceof Error) {
                next(bakery);
                return;
            }
            const response = await bakery.edit({ address, coords });
            if (response instanceof Error) {
                next(response);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new Bakeries();
