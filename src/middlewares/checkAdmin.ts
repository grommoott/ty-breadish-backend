import jwt, { AccessToken } from "@helpers/jwt";
import { Middleware } from "./middleware";
import { Roles } from "@enums";

const checkAdmin: Middleware = (req, _, next) => {
    const accessToken: string = req.cookies?.AccessToken

    if (!accessToken) {
        next(new Error("Unauthrized!", { cause: 401 }))
        return
    }

    const accessTokenPayload: AccessToken | Error = jwt.getAccessTokenPayload(req.cookies?.AccessToken)

    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload)
        return
    }

    if (accessTokenPayload.role !== Roles.Admin) {
        next(new Error("You must have admin role to make this request", { cause: 403 }))
        return
    }

    next()
}

export { checkAdmin }
