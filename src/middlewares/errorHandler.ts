import { NextFunction, Request, Response } from "express";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error.cause === 500) {
        next(error)
    }

    res.statusMessage = error.message
    res.sendStatus(error.cause as number || 400)
}

export { errorHandler }
