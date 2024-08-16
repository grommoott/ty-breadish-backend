import { Middleware } from "./middleware";

function checkParams(params: Array<string>): Middleware {
    return (req, _, next) => {
        for (const param of params) {
            if (!(param in req.params)) {
                next(new Error("Invalid request", { cause: 400 }))
                return
            }
        }

        next()
    }
}

export { checkParams }