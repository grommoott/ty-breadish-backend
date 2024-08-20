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
const multer_1 = __importDefault(require("multer"));
const promises_1 = __importDefault(require("fs/promises"));
const upload = (0, multer_1.default)({ dest: path_1.default.join(__dirname, "../../data/images/") });
class Images {
    getExtension(path) {
        const extension = path.split(".").pop();
        if (!extension || ["png", "jpg", "jpeg", "webp"].findIndex(ex => ex === extension) == -1) {
            return new Error("Invalid file extension");
        }
        return extension;
    }
    get = (category) => {
        return [
            (0, _middlewares_1.checkParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                const id = new _primitives_1.ImageId(req.params.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    next(image);
                    return;
                }
                res.sendFile(path_1.default.join(__dirname, `../../data/images/${category}/${image.id}.${image.extension}`));
            })
        ];
    };
    postCreate = (category, simple = false) => {
        return [
            upload.single("image"),
            simple ? () => { } : (0, _middlewares_1.checkBodyParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                if (!req.file) {
                    next(new Error("To post image you must send it"));
                    return;
                }
                const id = new _primitives_1.ImageId(req.body.id);
                const extension = this.getExtension(req.file.path);
                if (extension instanceof Error) {
                    next(extension);
                    return;
                }
                const image = await _entities_1.Image.create(id, category, extension);
                if (image instanceof Error) {
                    next(image);
                    return;
                }
                await promises_1.default.rename(req.file?.path, path_1.default.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`));
                res.sendStatus(201);
                next();
            })
        ];
    };
    delete = (category, simple = false) => {
        return [
            simple ? () => { } : (0, _middlewares_1.checkParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                const id = new _primitives_1.ImageId(req.params.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    next(image);
                    return;
                }
                await promises_1.default.rm(path_1.default.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`));
                const del = await image.delete();
                if (del instanceof Error) {
                    next(del);
                    return;
                }
                res.sendStatus(200);
                next();
            })
        ];
    };
    put = (category, simple = false) => {
        return [
            upload.single("image"),
            simple ? () => { } : (0, _middlewares_1.checkBodyParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                if (!req.file) {
                    next(new Error("To post image you must send it"));
                    return;
                }
                const id = new _primitives_1.ImageId(req.params.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    next(image);
                    return;
                }
                await promises_1.default.rm(path_1.default.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`));
                const extension = this.getExtension(req.file.path);
                if (extension instanceof Error) {
                    next(extension);
                    return;
                }
                const edit = await image.edit({ extension });
                if (edit instanceof Error) {
                    next(edit);
                    return;
                }
                await promises_1.default.rename(req.file.path, path_1.default.join(__dirname, `../../data/images/${category}/${id}.${extension}`));
                res.sendStatus(200);
                next();
            })
        ];
    };
}
exports.default = new Images();