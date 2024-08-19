import { NextFunction, Request, Response } from "express";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    res.sendStatus(error.cause as number || 400)

    next(error)
}

export { errorHandler }
