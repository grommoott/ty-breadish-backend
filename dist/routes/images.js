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
class Images {
    upload = (0, multer_1.default)({ dest: path_1.default.join(__dirname, "../../data/images/") });
    getExtension(path) {
        const extension = path.split(".").pop();
        if (!extension || ["png", "jpg", "jpeg", "webp"].findIndex(ex => ex === extension) == -1) {
            return new Error("Invalid file extension");
        }
        return extension;
    }
    get = (category, useDefaultImage = false) => {
        return [
            (0, _middlewares_1.checkParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                const id = new _primitives_1.ImageId(req.params.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    if (useDefaultImage && image.cause === 404) {
                        res.sendFile(path_1.default.join(__dirname, `../../data/images/${category}/default.png`));
                        return;
                    }
                    next(image);
                    return;
                }
                res.sendFile(path_1.default.join(__dirname, `../../data/images/${category}/${image.id}.${image.extension}`));
            })
        ];
    };
    getIsExists = (category) => {
        return [
            (0, _middlewares_1.checkParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                const id = new _primitives_1.ImageId(req.params.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    res.send(false);
                    next();
                    return;
                }
                res.send(true);
                next();
            })
        ];
    };
    postCreate = (category, simple = false, upload = true) => {
        return [
            upload ? this.upload.single("image") : (req, res, next) => next(),
            simple ? (req, res, next) => next() : (0, _middlewares_1.checkBodyParams)(["id"]),
            _middlewares_1.contentJson,
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                if (!req.file) {
                    next(new Error("To post image you must send it"));
                    return;
                }
                const id = new _primitives_1.ImageId(req.body.id);
                const extension = this.getExtension(req.file.originalname);
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
                res.send(image);
                next();
            })
        ];
    };
    postCreateBasic = [
        _middlewares_1.checkAdmin,
        this.upload.single("image"),
        (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
            if (!req.file) {
                next(new Error("To post image you must send it"));
                return;
            }
            const extension = this.getExtension(req.file.originalname);
            if (extension instanceof Error) {
                next(extension);
                return;
            }
            const image = await _entities_1.Image.createBasic(extension);
            if (image instanceof Error) {
                next(image);
                return;
            }
            await promises_1.default.rename(req.file.path, path_1.default.join(__dirname, `../../data/images/images/${image.id}.${image.extension}`));
            res.send(image);
            next();
        })
    ];
    delete = (category, simple = false) => {
        return [
            simple ? (req, res, next) => next() : (0, _middlewares_1.checkParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                const id = new _primitives_1.ImageId(req.params.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    next(image);
                    return;
                }
                Promise.all([
                    (async () => {
                        try {
                            await promises_1.default.rm(path_1.default.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`));
                        }
                        catch (e) { }
                    })(),
                    (async () => {
                        const del = await image.delete();
                        if (del instanceof Error) {
                            next(del);
                            return;
                        }
                    })()
                ]).then(() => {
                    res.sendStatus(200);
                    next();
                });
            })
        ];
    };
    put = (category, simple = false, upload = true) => {
        return [
            upload ? this.upload.single("image") : (req, res, next) => next(),
            simple ? (req, res, next) => next() : (0, _middlewares_1.checkBodyParams)(["id"]),
            (0, _helpers_1.asyncErrorCatcher)(async (req, res, next) => {
                if (!req.file) {
                    next(new Error("To post image you must send it"));
                    return;
                }
                const id = new _primitives_1.ImageId(req.body.id);
                const image = await _entities_1.Image.fromIdCategory(id, category);
                if (image instanceof Error) {
                    next(image);
                    return;
                }
                await promises_1.default.rm(path_1.default.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`));
                const extension = this.getExtension(req.file.originalname);
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
