import jwt, { AccessToken } from "@helpers/jwt";
import { Middleware } from "./middleware";
import { Roles } from "@enums";

const checkBaker: Middleware = (req, _, next) => {
    const accessToken: string = req.cookies?.AccessToken

    if (!accessToken) {
        next(new Error("Unauthorized!", { cause: 401 }))
    }

    const accessTokenPayload: AccessToken | Error = jwt.getAccessTokenPayload(accessToken)

    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload)
        return
    }

    if (accessTokenPayload.role != Roles.Baker && accessTokenPayload.role != Roles.Admin) {
        next(new Error("You must have baker role to make this request", { cause: 403 }))
        return
    }

    next()
}

export { checkBaker }
