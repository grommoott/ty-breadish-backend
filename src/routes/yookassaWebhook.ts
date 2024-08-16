import { checkYookassa, Middleware } from "@middlewares"

class YookassaWebhook {

    public post: Array<Middleware> = [
        checkYookassa,
        (req, res, next) => {
            console.log(req.body)
        }
    ]
}

export default new YookassaWebhook()
