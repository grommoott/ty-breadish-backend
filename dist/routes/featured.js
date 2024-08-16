"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _entities_2 = require("@entities");
const _primitives_1 = require("@primitives");
const _enums_1 = require("@enums");
class FeaturedRoute {
    get = [
        _middlewares_1.checkAuthorized,
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const featured = await _entities_2.Featured.fromUser(from);
            if (featured instanceof Error) {
                next(featured);
                return;
            }
            res.send(featured.map(aFeatured => aFeatured.toNormalView()));
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["target", "itemType"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.ItemId(req.body.target);
            const itemType = req.body.itemType;
            if (!(0, _helpers_1.isInEnum)(_enums_1.ItemTypes, itemType)) {
                next(new Error("Invalid request!"));
                return;
            }
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const featured = await user.createFeatured(target, itemType);
            if (featured instanceof Error) {
                next(featured);
                return;
            }
            res.send(featured.toNormalView());
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const id = new _primitives_1.FeaturedId(req.params.id);
            const featured = await _entities_2.Featured.fromId(id);
            if (featured instanceof Error) {
                next(featured);
                return;
            }
            if (from.id !== featured.from.id) {
                next(new Error("You don't have permissions for delete this featured"));
                return;
            }
            const del = await featured.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new FeaturedRoute();
