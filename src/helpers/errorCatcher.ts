import { AsyncMiddleware, Middleware } from "@middlewares";

function asyncErrorCatcher(middleware: AsyncMiddleware): Middleware {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (e) {
            next(e)
        }
    }
}

function errorCatcher(middleware: Middleware): Middleware {
    return async (req, res, next) => {
        try {
            middleware(req, res, next)
        } catch (e) {
            next(e)
        }
    }
}

export { errorCatcher, asyncErrorCatcher }
