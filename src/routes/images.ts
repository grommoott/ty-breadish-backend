import { Image } from "@entities"
import { ImageCategory } from "@enums"
import { asyncErrorCatcher } from "@helpers"
import { checkBodyParams, checkParams, Middleware } from "@middlewares"
import { ImageId } from "@primitives"
import path from "path"
import multer from "multer"
import fs from "fs/promises"

const upload = multer({ dest: path.join(__dirname, "../../data/images/") })

class Images {
    private getExtension(path: string): string | Error {
        const extension = path.split(".").pop()

        if (!extension || ["png", "jpg", "jpeg", "webp"].findIndex(ex => ex === extension) == -1) {
            return new Error("Invalid file extension")
        }

        return extension
    }

    public get: (category: ImageCategory) => Array<Middleware> = (category: ImageCategory) => {
        return [
            checkParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                const id: ImageId = new ImageId(req.params.id)

                const image: Image | Error = await Image.fromIdCategory(id, category)

                if (image instanceof Error) {
                    next(image)
                    return
                }

                res.sendFile(path.join(__dirname, `../../data/images/${category}/${image.id}.${image.extension}`))
            })
        ]
    }

    public postCreate: (category: ImageCategory, simple?: boolean) => Array<Middleware> = (category: ImageCategory, simple: boolean = false) => {
        return [
            upload.single("image"),
            simple ? () => { } : checkBodyParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                if (!req.file) {
                    next(new Error("To post image you must send it"))
                    return
                }

                const id: ImageId = new ImageId(req.body.id)

                const extension = this.getExtension(req.file.path)

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

                res.sendStatus(201)

                next()
            })
        ]
    }

    public delete: (category: ImageCategory, simple?: boolean) => Array<Middleware> = (category: ImageCategory, simple: boolean = false) => {
        return [
            simple ? () => { } : checkParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                const id: ImageId = new ImageId(req.params.id)

                const image: Image | Error = await Image.fromIdCategory(id, category)

                if (image instanceof Error) {
                    next(image)
                    return
                }

                await fs.rm(path.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`))

                const del: boolean | Error = await image.delete()

                if (del instanceof Error) {
                    next(del)
                    return
                }

                res.sendStatus(200)

                next()
            })
        ]
    }

    public put: (category: ImageCategory, simple?: boolean) => Array<Middleware> = (category: ImageCategory, simple: boolean = false) => {
        return [
            upload.single("image"),
            simple ? () => { } : checkBodyParams(["id"]),
            asyncErrorCatcher(async (req, res, next) => {
                if (!req.file) {
                    next(new Error("To post image you must send it"))
                    return
                }

                const id: ImageId = new ImageId(req.params.id)

                const image: Image | Error = await Image.fromIdCategory(id, category)

                if (image instanceof Error) {
                    next(image)
                    return
                }

                await fs.rm(path.join(__dirname, `../../data/images/${category}/${id}.${image.extension}`))

                const extension = this.getExtension(req.file.path)

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
