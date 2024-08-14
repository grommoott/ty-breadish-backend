import { NextFunction, Request, Response } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void
type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>

export { Middleware, AsyncMiddleware }
