import jwt, { AccessToken } from "@helpers/jwt";
import { Middleware } from "./middleware";
import { Roles } from "@enums";

const checkAdmin: Middleware = (req, _, next) => {
    console.log("checkAdming 1")
    const accessToken: string = req.cookies?.AccessToken

    console.log("checkAdming 2")
    if (!accessToken) {
        next(new Error("Unauthorized!", { cause: 401 }))
        return
    }

    console.log("checkAdming 3")
    const accessTokenPayload: AccessToken | Error = jwt.getAccessTokenPayload(req.cookies?.AccessToken)

    console.log("checkAdming 4")
    if (accessTokenPayload instanceof Error) {
        next(accessTokenPayload)
        return
    }

    console.log("checkAdming 5")
    if (accessTokenPayload.role !== Roles.Admin) {
        next(new Error("You must have admin role to make this request", { cause: 403 }))
        return
    }

    console.log("checkAdming 6")
    next()
}

export { checkAdmin }
