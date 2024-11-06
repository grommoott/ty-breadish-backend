import { New } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { checkAdmin, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { NewId } from "@primitives"
import path from "path"
import images from "./images"
import { ImageCategories } from "@enums"

class News {
    public getPage: Array<Middleware> = [
        checkParams(["page"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const page: number = parseInt(req.params.page)

            const news: Array<New> | Error = await New.getNewsPage(page)

            if (news instanceof Error) {
                next(news)
                return
            }

            res.send(news.map(aNew => aNew.toListView()))

            next()
        })
    ]

    public get: Array<Middleware> = [checkParams(["id"]),
        contentJson,
    asyncErrorCatcher(async (req, res, next) => {
        const id: NewId = new NewId(req.params.id)

        const aNew: New | Error = await New.fromId(id)

        if (aNew instanceof Error) {
            next(aNew)
            return
        }

        res.send(aNew.toNormalView())

        next()
    })
    ]

    public postCreate: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["title", "content"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const title: string = req.body.title
            const content: string = req.body.content

            const aNew: New | Error = await New.create(title, content)

            if (aNew instanceof Error) {
                next(aNew)
                return
            }

            res.send(aNew.toNormalView())

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAdmin,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: NewId = new NewId(req.params.id)

            const aNew: New | Error = await New.fromId(id)

            if (aNew instanceof Error) {
                next(aNew)
                return
            }

            const del: boolean | Error = await aNew.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public put: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: NewId = new NewId(req.body.id)
            const title: string | undefined = req.body.title
            const content: string | undefined = req.body.content

            const aNew: New | Error = await New.fromId(id)

            if (aNew instanceof Error) {
                next(aNew)
                return
            }

            const edit: void | Error = await aNew.edit({ title, content })

            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public getImages: Array<Middleware> = images.get(ImageCategories.News)

    public getIsImageExists: Array<Middleware> = images.getIsExists(ImageCategories.News)

    public postImages: Array<Middleware> = [
        checkAdmin,
        ...images.postCreate(ImageCategories.News)
    ]

    public deleteImages: Array<Middleware> = [
        checkAdmin,
        ...images.delete(ImageCategories.News)
    ]

    public putImages: Array<Middleware> = [
        checkAdmin,
        ...images.put(ImageCategories.News)
    ]

}

export default new News()
