import { NextFunction, Request, Response } from "express";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    res.sendStatus(error.cause as number || 400)

    if (error.cause === 500) {
        next(error)
    }
}

export { errorHandler }
