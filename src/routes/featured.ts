import { User } from "@entities"
import { asyncErrorCatcher, isInEnum } from "@helpers"
import { checkAuthorized, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { Featured } from "@entities"
import { FeaturedId, ItemId, ItemInfo, UserId } from "@primitives"
import { ItemType, ItemTypes } from "@enums"

class FeaturedRoute {
    public get: Array<Middleware> = [
        checkAuthorized,
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)

            const featured: Array<Featured> | Error = await Featured.fromUser(from)

            if (featured instanceof Error) {
                next(featured)
                return
            }

            res.send(featured.map(aFeatured => aFeatured.toNormalView()))

            next()
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["target", "itemType"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const target: ItemId = new ItemId(req.body.target)
            const itemType: ItemType = req.body.itemType

            if (!isInEnum(ItemTypes, itemType)) {
                next(new Error("Invalid request!"))
                return
            }

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const featured: Featured | Error = await user.createFeatured(target, itemType)

            if (featured instanceof Error) {
                next(featured)
                return
            }

            res.send(featured.toNormalView())

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAuthorized,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)
            const id: FeaturedId = new FeaturedId(req.params.id)

            const featured: Featured | Error = await Featured.fromId(id)

            if (featured instanceof Error) {
                next(featured)
                return
            }

            if (from.id !== featured.from.id) {
                next(new Error("You don't have permissions for delete this featured"))
                return
            }

            const del: boolean | Error = await featured.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]
}

export default new FeaturedRoute()
