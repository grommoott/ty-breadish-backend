import { Middleware } from "./middleware";

const ips: Array<string> = new Array(
    "77.75.154.206",
    "10.219.43.124",
    "10.220.132.239"
)

const checkYookassa: Middleware = (req, res, next) => {
    const ip: string | undefined = req.header("x-forwarded-for")?.split(", ").pop()

    console.log(req.header("x-forwarded-for"))

    if (ips.findIndex((val) => val == ip) == -1) {
        next(new Error("Forbidden!", { cause: 403 }))
        return
    }

    next()
}

export { checkYookassa }
