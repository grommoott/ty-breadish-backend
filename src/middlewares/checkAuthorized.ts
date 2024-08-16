import jwt, { AccessToken } from "@helpers/jwt";
import { Middleware } from "./middleware";

const checkAuthorized: Middleware = (req, _, next) => {
    if (!req.cookies.AccessToken) {
        next(new Error("Unauthorized", { cause: 401 }))
        return
    }

    const accessTokenPayload: AccessToken | Error = jwt.getAccessTokenPayload(req.cookies.AccessToken)

    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload)
        return
    }

    req.body.accessTokenPayload = accessTokenPayload

    next()
}

export { checkAuthorized }
