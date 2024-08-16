"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _enums_1 = require("@enums");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
class Comments {
    postCreate = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkBodyParams)(["target", "content"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.MediaId(req.body.target);
            const content = req.body.content;
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const comment = await user.createComment(target, content);
            if (comment instanceof Error) {
                next(comment);
                return;
            }
            res.send(comment.toNormalView());
            next();
        })
    ];
    get = [
        (0, _middlewares_1.checkParams)(["target", "sortOrder", "page"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const target = new _primitives_1.MediaId(req.params.target);
            const sortOrder = req.params.sortOrder;
            const page = parseInt(req.params.page);
            if (!(0, _helpers_1.isInEnum)(_enums_1.CommentsSortOrders, sortOrder)) {
                next(new Error("Invalid request!"));
                return;
            }
            const comments = await _entities_1.Comment.getCommentsPage(target, sortOrder, page);
            if (comments instanceof Error) {
                next(comments);
                return;
            }
            res.send(comments.map(comment => comment.toNormalView()));
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAuthorized,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.CommentId(req.params.id);
            const user = await _entities_1.User.fromId(new _primitives_1.UserId(req.body.accessTokenPayload.sub));
            if (user instanceof Error) {
                next(user);
                return;
            }
            const comment = await _entities_1.Comment.fromId(id);
            if (comment instanceof Error) {
                next(comment);
                return;
            }
            if (comment.from.id !== new _primitives_1.UserId(req.body.accessTokenPayload.sub).id && req.body.accessTokenPayload.role !== _enums_1.Roles.Admin) {
                next(new Error("You don't have permissions to delete this comment", { cause: 403 }));
                return;
            }
            const del = await comment.delete();
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
        (0, _middlewares_1.checkBodyParams)(["id", "content"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.CommentId(req.body.id);
            const content = req.body.content;
            const comment = await _entities_1.Comment.fromId(id);
            if (comment instanceof Error) {
                next(comment);
                return;
            }
            if (comment.from.id !== new _primitives_1.UserId(req.body.accessTokenPayload.sub).id) {
                next(new Error("You don't have permissions to update this comment"));
                return;
            }
            const edit = await comment.edit({ content });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
}
exports.default = new Comments();
