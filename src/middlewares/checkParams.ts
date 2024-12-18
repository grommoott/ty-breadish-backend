import { Middleware } from "./middleware";

function checkParams(params: Array<string>): Middleware {
    console.log("checkParams")

    return (req, _, next) => {
        for (const param of params) {
            if (!(param in req.params)) {
                next(new Error(`Invalid request, ${param} isn't found in request params`, { cause: 400 }))
                return
            }
        }

        next()
    }
}

export { checkParams }
