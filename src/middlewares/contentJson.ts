import { Middleware } from "./middleware";

const contentJson: Middleware = (_, res, next) => {
    res.header("Content-Type", "application/json")

    next()
}

export { contentJson }
