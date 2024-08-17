import { checkYookassa, Middleware } from "@middlewares"

class YookassaWebhook {

    public post: Array<Middleware> = [
        (req, res, next) => {
            console.log(req.body)
            res.sendStatus(200)

            next()
        }
    ]
}

export default new YookassaWebhook()
