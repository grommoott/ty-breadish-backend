import { NextFunction, Request, Response } from "express";
import { Middleware } from "./middleware";

function checkBodyParams(params: Array<string>): Middleware {
    return (req: Request, _: Response, next: NextFunction) => {
        for (let param of params) {
            if (!(param in req.body)) {
                next(new Error("Invalid request", { cause: 400 }))
            }
        }

        next()
    }
}

export { checkBodyParams }
