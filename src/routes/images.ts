import { Image } from "@entities"
import { ImageCategory } from "@enums"
import { asyncErrorCatcher } from "@helpers"
import { checkAdmin, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { ImageId } from "@primitives"
import path from "path"
import multer from "multer"
import fs from "fs/promises"

class Images {
    public upload = multer({ dest: path.join(__dirname, "../../data/images/") })

    private getExtension(path: string): string | Error {
        const extension = path.split(".").pop()

        if (!extension || ["png", "jpg", "jpeg", "webp"].findIndex(ex => ex === extension) == -1) {
            return new Error("Invalid file extension")
        }

        return extension
    }

    public get: (category: ImageCategory, useDefaultImage?: boolean) => Array<Middleware> = (category: ImageCategory, useDefaultImage = false) => {
        return [
            checkParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                const id: ImageId = new ImageId(req.params.id)

                const image: Image | Error = await Image.fromIdCategory(id, category)

                if (image instanceof Error) {
                    if (useDefaultImage && image.cause === 404) {
                        res.sendFile(path.join(__dirname, `../../data/images/${category}/default.png`))
                        return
                    }

                    next(image)
                    return
                }

                res.sendFile(path.join(__dirname, `../../data/images/${category}/${image.id}.${image.extension}`))
            })
        ]
    }

    public getIsExists: (category: ImageCategory) => Array<Middleware> = (category: ImageCategory) => {
        return [
            checkParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                const id: ImageId = new ImageId(req.params.id)

                const image: Image | Error = await Image.fromIdCategory(id, category)

                if (image instanceof Error) {
                    res.send(false)
                    next()
                    return
                }

                res.send(true)
                next()
            })
        ]
    }

    public postCreate:
        (category: ImageCategory, simple?: boolean, upload?: boolean) => Array<Middleware> =
        (category: ImageCategory, simple: boolean = false, upload: boolean = true) => {
            return [
                upload ? this.upload.single("image") : (req, res, next) => next(),
                simple ? (req, res, next) => next() : checkBodyParams(["id"]),
                contentJson,
                asyncErrorCatcher(async (req, res, next) => {
                    if (!req.file) {
                        next(new Error("To post image you must send it"))
                        return
                    }

                    const id: ImageId = new ImageId(req.body.id)

                    const extension = this.getExtension(req.file.originalname)

                    if (extension instanceof Error) {
                        next(extension)
                        return
                    }

                    const image: Image | Error = await Image.create(id, category, extension)

                    if (image instanceof Error) {
                        next(image)
                        return
                    }


                    await fs.rename(req.file?.path, path.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`))

                    res.send(image)

                    next()
                })
            ]
        }

    public postCreateBasic: Array<Middleware> = [
        checkAdmin,
        this.upload.single("image"),
        asyncErrorCatcher(async (req, res, next) => {
            if (!req.file) {
                next(new Error("To post image you must send it"))
                return
            }

            const extension: string | Error = this.getExtension(req.file.originalname)

            if (extension instanceof Error) {
                next(extension)
                return
            }

            const image: Image | Error = await Image.createBasic(extension)

            if (image instanceof Error) {
                next(image)
                return
            }

            await fs.rename(req.file.path, path.join(__dirname, `../../data/images/images/${image.id}.${image.extension}`))

            res.send(image)

            next()
        })
    ]

    public delete: (category: ImageCategory, simple?: boolean) => Array<Middleware> = (category: ImageCategory, simple: boolean = false) => {
        return [
            simple ? (req, res, next) => next() : checkParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                const id: ImageId = new ImageId(req.params.id)

                const image: Image | Error = await Image.fromIdCategory(id, category)

                if (image instanceof Error) {
                    next(image)
                    return
                }

                Promise.all([
                    (async () => {
                        try {
                            await fs.rm(path.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`))
                        } catch (e) { }
                    })(),
                    (async () => {
                        const del: boolean | Error = await image.delete()

                        if (del instanceof Error) {
                            next(del)
                            return
                        }

                    })()
                ]).then(() => {
                    res.sendStatus(200)

                    next()

                })
            })
        ]
    }

    public put:
        (category: ImageCategory, simple?: boolean, upload?: boolean) => Array<Middleware> =
        (category: ImageCategory, simple: boolean = false, upload: boolean = true) => {
            return [
                upload ? this.upload.single("image") : (req, res, next) => next(),
                simple ? (req, res, next) => next() : checkBodyParams(["id"]),
                asyncErrorCatcher(async (req, res, next) => {
                    if (!req.file) {
                        next(new Error("To post image you must send it"))
                        return
                    }

                    const id: ImageId = new ImageId(req.body.id)

                    const image: Image | Error = await Image.fromIdCategory(id, category)

                    if (image instanceof Error) {
                        next(image)
                        return
                    }

                    await fs.rm(path.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`))

                    const extension = this.getExtension(req.file.originalname)

                    if (extension instanceof Error) {
                        next(extension)
                        return
                    }

                    const edit: void | Error = await image.edit({ extension })

                    if (edit instanceof Error) {
                        next(edit)
                        return
                    }

                    await fs.rename(req.file.path, path.join(__dirname, `../../data/images/${category}/${id}.${extension}`))

                    res.sendStatus(200)

                    next()
                })
            ]
        }
}

export default new Images()
