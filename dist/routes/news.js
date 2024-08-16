"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _entities_1 = require("@entities");
const _helpers_1 = require("@helpers");
const _middlewares_1 = require("@middlewares");
const _primitives_1 = require("@primitives");
const path_1 = __importDefault(require("path"));
class News {
    getPage = [
        (0, _middlewares_1.checkParams)(["page"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const page = parseInt(req.params.page);
            const news = await _entities_1.New.getNewsPage(page);
            if (news instanceof Error) {
                next(news);
                return;
            }
            res.send(news.map(aNew => aNew.toListView()));
            next();
        })
    ];
    get = [
        (0, _middlewares_1.checkParams)(["id"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.NewId(req.params.id);
            const aNew = await _entities_1.New.fromId(id);
            if (aNew instanceof Error) {
                next(aNew);
                return;
            }
            res.send(aNew.toNormalView());
            next();
        })
    ];
    postCreate = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["title", "content"]),
        _middlewares_1.contentJson,
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const title = req.body.title;
            const content = req.body.content;
            const aNew = await _entities_1.New.create(title, content);
            if (aNew instanceof Error) {
                next(aNew);
                return;
            }
            res.send(aNew.toNormalView());
            next();
        })
    ];
    delete = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.NewId(req.params.id);
            const aNew = await _entities_1.New.fromId(id);
            if (aNew instanceof Error) {
                next(aNew);
                return;
            }
            const del = await aNew.delete();
            if (del instanceof Error) {
                next(del);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    put = [
        _middlewares_1.checkAdmin,
        (0, _middlewares_1.checkBodyParams)(["id", "title", "content"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.NewId(req.body.id);
            const title = req.body.title;
            const content = req.body.title;
            const aNew = await _entities_1.New.fromId(id);
            if (aNew instanceof Error) {
                next(aNew);
                return;
            }
            const edit = await aNew.edit({ title, content });
            if (edit instanceof Error) {
                next(edit);
                return;
            }
            res.sendStatus(200);
            next();
        })
    ];
    getImages = [
        (0, _middlewares_1.checkParams)(["id"]),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            const id = new _primitives_1.NewId(req.params.id);
            res.sendFile(path_1.default.join(__dirname, `../../data/images/news/${id}.webp`));
            next();
        })
    ];
}
exports.default = new News();
