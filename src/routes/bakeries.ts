import { asyncErrorCatcher } from "@helpers";
import { checkAdmin, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares";
import { BakeryId } from "@primitives";
import { Bakery } from "@entities";
import { Coords } from "@primitives";

class Bakeries {
    public get: Array<Middleware> = [
        checkParams(["id"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const id: BakeryId = new BakeryId(req.params.id)

            const response: Bakery | Error = await Bakery.fromId(id)

            if (response instanceof Error) {
                next(response)
                return
            }

            res.send(response.toNormalView())

            next()
        })
    ]

    public getList: Array<Middleware> = [
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const response: Array<Bakery> | Error = await Bakery.getList()

            if (response instanceof Error) {
                next(response)
                return
            }

            res.send(response.map(bakery => bakery.toNormalView()))

            next()
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["address", "coords"]),
        asyncErrorCatcher(async (req, res, next) => {
            const address: string = req.body.address
            const coords: Coords = Coords.fromObject(req.body.coords)

            const response: Bakery | Error = await Bakery.create(address, coords)

            if (response instanceof Error) {
                next(response)
                return
            }

            res.send(response.toNormalView())

            next()
        })
    ]

    public delete: Array<Middleware> = [
        checkAdmin,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            console.log("delete bakery")
            const id: BakeryId = new BakeryId(req.body.id)

            const bakery: Bakery | Error = await Bakery.fromId(id)

            if (bakery instanceof Error) {
                next(bakery)
                return
            }

            const response: boolean | Error = await bakery.delete()

            if (response instanceof Error) {
                next(response)
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
            const id: BakeryId = new BakeryId(req.body.id)
            const address: string = req.body?.address
            const coords: Coords | undefined = req.body?.coords ? Coords.fromObject(req.body?.coords) : undefined

            const bakery: Bakery | Error = await Bakery.fromId(id)

            if (bakery instanceof Error) {
                next(bakery)
                return
            }

            const response: void | Error = await bakery.edit({ address, coords })

            if (response instanceof Error) {
                next(response)
                return
            }

            res.sendStatus(200)

            next()
        })
    ]
}

export default new Bakeries()
