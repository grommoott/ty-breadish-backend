import { Like, User } from "@entities"
import { LikeType, LikeTypes } from "@enums"
import { asyncErrorCatcher, isInEnum } from "@helpers"
import { checkAuthorized, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { LikeId, MediaId, UserId } from "@primitives"

class Likes {
    public get: Array<Middleware> = [
        checkAuthorized,
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)

            const likes: Array<Like> | Error = await Like.fromUser(from)

            if (likes instanceof Error) {
                next(likes)
                return
            }

            res.send(likes.map(like => like.toNormalView()))

            next()
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["target", "likeType"]),
        asyncErrorCatcher(async (req, res, next) => {
            const target: MediaId = new MediaId(req.body.target)
            const likeType: LikeType = req.body.likeType

            if (!isInEnum(LikeTypes, likeType)) {
                next(new Error("Invalid request!"))
                return
            }

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload))

            if (user instanceof Error) {
                next(user)
                return
            }

            const like: Like | Error = await user.createLike(target, likeType)

            if (like instanceof Error) {
                next(like)
                return
            }

            res.send(like.toNormalView())

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAuthorized,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)
            const id: LikeId = new LikeId(req.params.id)

            const like: Like | Error = await Like.fromId(id)

            if (like instanceof Error) {
                next(like)
                return
            }

            if (from.id !== like.from.id) {
                next(new Error("You don't have permissions to delete this like"))
                return
            }

            const del: boolean | Error = await like.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]
}

export default new Likes()
