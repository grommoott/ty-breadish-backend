import { Middleware } from "./middleware";

const checkYookassa: Middleware = (req, res, next) => {
    console.log(req.url)

    next()
}

export { checkYookassa }
