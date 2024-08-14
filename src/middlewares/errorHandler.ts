import { NextFunction, Request, Response } from "express";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error.cause === 500) {
        res.sendStatus(500)
    } else if (error.cause === 400) {
        res.sendStatus(400)
    } else if (error.cause === 401) {
        res.sendStatus(401)
    } else {
        res.sendStatus(400)
    }

    next(error)
}

export { errorHandler }
