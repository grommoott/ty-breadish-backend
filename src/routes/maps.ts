import { asyncErrorCatcher } from "@helpers";
import { geocodingApi, mapsApi } from "@helpers/maps";
import { checkParams, contentJson, Middleware } from "@middlewares";
import { Coords } from "@primitives";
import { Bundle } from "typescript";

class Maps {
    public getTile: Array<Middleware> = [
        checkParams(["x", "y", "z"]),
        asyncErrorCatcher(async (req, res, next) => {
            const x: number = parseInt(req.params.x)
            const y: number = parseInt(req.params.y)
            const z: number = parseInt(req.params.z)

            const response: Bundle | Error = await mapsApi.getTile(x, y, z)

            if (response instanceof Error) {
                next(response)
                return
            }

            res.contentType("image/png")
            res.send(response)

            next()
        })
    ]

    public getFromCoords: Array<Middleware> = [
        checkParams(["longitude", "latitude"]),
        asyncErrorCatcher(async (req, res, next) => {
            const longitude: number = parseFloat(req.params.longitude)
            const latitude: number = parseFloat(req.params.latitude)

            const response: string | Error = await geocodingApi.fromCoords(new Coords(latitude, longitude))

            if (response instanceof Error) {
                next(response)
                return
            }

            res.send(response)

            next()
        })
    ]

    public getFromQuery: Array<Middleware> = [
        checkParams(["query"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const query: string = req.params.query

            const response: Array<Coords> | Error = await geocodingApi.fromQuery(query)

            if (response instanceof Error) {
                next(response)
                return
            }

            res.send(response.map(coord => coord.toNormalView()))

            next()
        })
    ]
}

export default new Maps()
