"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
class Likes {
    get = [
        _middlewares_1.checkAuthorized,
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const likes = await _entities_1.Like.fromUser(from);
            if (likes instanceof Error) {
                next(likes);
                return;
            }
            res.send(likes.map(like => like.toNormalView()));
            next();
        })
    ];
    getCount = [
        (0, _middlewares_1.checkParams)(["target", "type"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.Id(req.params.target);
            const type = req.params.type;
            if (!((0, _helpers_1.isInEnum)(_enums_1.LikeTypes, type))) {
                next(new Error("Invalid request!"));
                return;
            }
            const count = await _entities_1.Like.getCount(target, type);
            if (count instanceof Error) {
                next(count);
                return;
            }
            res.send(count);
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["target", "type"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.Id(req.body.target);
            const type = req.body.type;
            if (!(0, _helpers_1.isInEnum)(_enums_1.LikeTypes, type)) {
                next(new Error("Invalid request!"));
                return;
            }
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const like = await user.createLike(target, type);
            if (like instanceof Error) {
                next(like);
                return;
            }
            res.send(like.toNormalView());
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const id = new _primitives_1.LikeId(req.params.id);
            const like = await _entities_1.Like.fromId(id);
            if (like instanceof Error) {
                next(like);
                return;
            }
            if (from.id !== like.from.id) {
                next(new Error("You don't have permissions to delete this like"));
                return;
            }
            const del = await like.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new Likes();
