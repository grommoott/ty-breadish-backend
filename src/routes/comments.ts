import { Comment, User } from "@entities"
import { CommentsSortOrder, CommentsSortOrders, Roles } from "@enums"
import { asyncErrorCatcher, isInEnum } from "@helpers"
import { checkAuthorized, checkBodyParams, checkParams, Middleware } from "@middlewares"
import { CommentId, MediaId, UserId } from "@primitives"

class Comments {
    public postCreate: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["target", "content"]),
        asyncErrorCatcher(async (req, res, next) => {
            const target: MediaId = new MediaId(req.body.target)
            const content: string = req.body.content

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const comment: Comment | Error = await user.createComment(target, content)

            if (comment instanceof Error) {
                next(comment)
                return
            }

            res.send(comment.toNormalView())

            next()
        })
    ]

    public get: Array<Middleware> = [
        checkParams(["target", "sortOrder", "page"]),
        asyncErrorCatcher(async (req, res, next) => {
            const target: MediaId = new MediaId(req.params.target)
            const sortOrder: CommentsSortOrder = req.params.sortOrder as CommentsSortOrder
            const page: number = parseInt(req.params.page)

            if (!isInEnum(CommentsSortOrders, sortOrder)) {
                next(new Error("Invalid request!"))
                return
            }

            const comments: Array<Comment> | Error = await Comment.getCommentsPage(target, sortOrder, page)

            if (comments instanceof Error) {
                next(comments)
                return
            }

            res.send(comments.map(comment => comment.toNormalView()))

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAuthorized,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: CommentId = new CommentId(req.params.id)

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const comment: Comment | Error = await Comment.fromId(id)

            if (comment instanceof Error) {
                next(comment)
                return
            }

            if (comment.from.id !== new UserId(req.body.accessTokenPayload.sub).id && req.body.accessTokenPayload.role !== Roles.Admin) {
                next(new Error("You don't have permissions to delete this comment", { cause: 403 }))
                return
            }

            const del: boolean | Error = await comment.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]

    public put: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: CommentId = new CommentId(req.body.id)
            const content: string | undefined = req.body.content

            const comment: Comment | Error = await Comment.fromId(id)

            if (comment instanceof Error) {
                next(comment)
                return
            }

            if (comment.from.id !== new UserId(req.body.accessTokenPayload.sub).id) {
                next(new Error("You don't have permissions to update this comment"))
                return
            }

            const edit: void | Error = await comment.edit({ content })


            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]
}

export default new Comments()
