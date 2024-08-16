import { checkYookassa, Middleware } from "@middlewares"

class YookassaWebhook {
    public post: Array<Middleware> = [
        checkYookassa,
        (req, res, next) => {
            console.log(req.body)

            next()
        }
    ]
}

export default new YookassaWebhook()
