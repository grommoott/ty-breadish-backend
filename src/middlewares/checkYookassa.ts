import { Middleware } from "./middleware";

const ips: Array<string> = new Array(
    "185.71.76.0/27",
    "185.71.77.0/27",
    "77.75.153.0/25",
    "77.75.156.11",
    "77.75.156.35",
    "77.75.154.128/25",
    "2a02:5180::/32"
)

const checkYookassa: Middleware = (req, res, next) => {
    console.log(req)
    // if (ips.findIndex((val) => val === req.ip) == -1) {
    //     next(new Error("Forbidden!", { cause: 403 }))
    //     return
    // }

    next()
}

export { checkYookassa }
