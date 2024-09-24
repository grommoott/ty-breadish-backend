import { NextFunction, Request, Response } from "express"
import { Middleware } from "./middleware"

function checkQueryParams(params: Array<string>): Middleware {
    return (req: Request, _: Response, next: NextFunction) => {
        for (let param of params) {
            if (!(param in req.query)) {
                next(new Error(`Invalid request, ${param} isn't found in query params`, { cause: 400 }))
                return
            }
        }

        next()
    }
}

export { checkQueryParams }
