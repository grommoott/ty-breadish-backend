import { Order, User } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { checkAuthorized, checkBodyParams, contentJson, Middleware } from "@middlewares"
import { UserId } from "@primitives"

class Orders {
    public get: Array<Middleware> = [
        checkAuthorized,
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const user: User | Error = await User.fromId(new UserId(req.body.accessTokenPayload.sub))

            if (user instanceof Error) {
                next(user)
                return
            }

            const orders: Array<Order> | Error = await user.getOrders()

            if (orders instanceof Error) {
                next(orders)
                return
            }

            res.send(orders.map(order => order.toNormalView()))

            next()
        })
    ]
}

export default new Orders()
