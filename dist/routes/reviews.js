"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const _enums_2 = require("@enums");
class Reviews {
    getPage = [
        (0, _middlewares_1.checkParams)(["target", "sortOrder", "page"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.ItemId(req.params.target);
            const sortOrder = req.params.sortOrder;
            const page = parseInt(req.params.page);
            if (!(0, _helpers_1.isInEnum)(_enums_1.ReviewsSortOrders, sortOrder)) {
                next(new Error("Invalid request!"));
                return;
            }
            const reviews = await _entities_1.Review.getReviewsPage(target, sortOrder, page);
            if (reviews instanceof Error) {
                next(reviews);
                return;
            }
            res.send(reviews.map(review => review.toNormalView()));
            next();
        })
    ];
    getByItemUser = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["target"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.ItemId(req.params.target);
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const review = await _entities_1.Review.fromItemUser(target, user.id);
            if (review instanceof Error) {
                res.send(null);
                return;
            }
            res.send(review.toNormalView());
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["target", "content", "rate"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.ItemId(req.body.target);
            const content = req.body.content;
            const rate = parseInt(req.body.rate);
            if (!(0, _helpers_1.isInEnum)(_enums_2.Rates, rate)) {
                next(new Error("Invalid request!"));
                return;
            }
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const review = await user.createReview(target, content, rate);
            if (review instanceof Error) {
                next(review);
                return;
            }
            res.send(review.toNormalView());
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const id = new _primitives_1.ReviewId(req.params.id);
            const review = await _entities_1.Review.fromId(id);
            if (review instanceof Error) {
                next(review);
                return;
            }
            if (from.id !== review.from.id) {
                next(new Error("You don't have permissions to delete this review"));
                return;
            }
            const del = await review.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    put = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const from = new _primitives_1.UserId(req.body.accessTokenPayload.sub);
            const id = new _primitives_1.ReviewId(req.body.id);
            const content = req.body.content;
            const rate = req.body.rate;
            if (!(0, _helpers_1.isInEnum)(_enums_2.Rates, rate)) {
                next(new Error("Invalid request!"));
                return;
            }
            const review = await _entities_1.Review.fromId(id);
            if (review instanceof Error) {
                next(review);
                return;
            }
            if (from.id !== review.from.id) {
                next(new Error("You don't have permissions to update this review"));
            }
            const edit = await review.edit({ content, rate });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new Reviews();
