import getReview from "@api/get/getReview"
import { Review, User } from "@entities"
import { ReviewsSortOrder, ReviewsSortOrders } from "@enums"
import { asyncErrorCatcher, isInEnum } from "@helpers"
import { checkAuthorized, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { ItemId, ReviewId, UserId } from "@primitives"
import { Rate, Rates } from "@enums"

class Reviews {
    public getPage: Array<Middleware> = [
        checkParams(["target", "sortOrder", "page"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const target: ItemId = new ItemId(req.params.target)
            const sortOrder: ReviewsSortOrder = req.params.sortOrder as ReviewsSortOrder
            const page: number = parseInt(req.params.page)

            if (!isInEnum(ReviewsSortOrders, sortOrder)) {
                next(new Error("Invalid request!"))
                return
            }

            const reviews: Array<Review> | Error = await Review.getReviewsPage(target, sortOrder, page)

            if (reviews instanceof Error) {
                next(reviews)
                return
            }

            res.send(reviews.map(review => review.toNormalView()))

            next()
        })
    ]

    public getByItemUser: Array<Middleware> = [
        checkAuthorized,
        checkParams(["target"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const target: ItemId = new ItemId(req.params.target)

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const review: Review | Error = await Review.fromItemUser(target, user.id)

            if (review instanceof Error) {
                res.send(null)
                return
            }

            res.send(review.toNormalView())

            next()
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAuthorized,
        checkBodyParams(["target", "content", "rate"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const target: ItemId = new ItemId(req.body.target)
            const content: string = req.body.content
            const rate: Rate = parseInt(req.body.rate) as Rate

            if (!isInEnum(Rates, rate)) {
                next(new Error("Invalid request!"))
                return
            }

            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const review: Review | Error = await user.createReview(target, content, rate)

            if (review instanceof Error) {
                next(review)
                return
            }

            res.send(review.toNormalView())

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAuthorized,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)
            const id: ReviewId = new ReviewId(req.params.id)

            const review: Review | Error = await Review.fromId(id)

            if (review instanceof Error) {
                next(review)
                return
            }

            if (from.id !== review.from.id) {
                next(new Error("You don't have permissions to delete this review"))
                return
            }

            const del: boolean | Error = await review.delete()

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
            const from: UserId = new UserId(req.body.accessTokenPayload.sub)
            const id: ReviewId = new ReviewId(req.body.id)
            const content: string | undefined = req.body.content
            const rate: Rate | undefined = req.body.rate

            if (!isInEnum(Rates, rate)) {
                next(new Error("Invalid request!"))
                return
            }

            const review: Review | Error = await Review.fromId(id)

            if (review instanceof Error) {
                next(review)
                return
            }

            if (from.id !== review.from.id) {
                next(new Error("You don't have permissions to update this review"))
            }

            const edit: void | Error = await review.edit({ content, rate })

            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]
}

export default new Reviews()
