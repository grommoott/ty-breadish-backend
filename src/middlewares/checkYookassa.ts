import { Middleware } from "./middleware";

const ips: Array<string> = new Array(
    "77.75.154.206"
)

const checkYookassa: Middleware = (req, res, next) => {
    const ip: string | undefined = req.header("true-client-ip")?.split(", ").pop()

    if (ips.findIndex((val) => val == ip) == -1) {
        next(new Error("Forbidden!", { cause: 403 }))
        return
    }

    next()
}

export { checkYookassa }
