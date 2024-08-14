import { Moment, UserId } from "@primitives"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Session, User } from "@entities"
import { v4 as uuid } from "uuid"
import { weekSeconds } from "./timeConstants"

type AccessToken = {
    sub: number,
    iat: number, // Unix Timestamp of token creation
    exp: number, // Unix Timestamp of token invalidation
}

type RefreshToken = {
    sub: number,
    iat: number,
    exp: number,
    jti: string, // Token id
    dvi: string, // Device id
}

class Jwt {
    private _secret: string

    public createAccessToken(user: User, lifetime: number = 1800): string {
        const date = Math.floor(new Date().getTime() / 1000)

        return jwt.sign({
            sub: user.id.id,
            iat: date,
            exp: date + lifetime
        }, this._secret)
    }

    public async createRefreshTokenFromSession(session: Session, lifetime: number = 2 * weekSeconds): Promise<string | Error> {
        const date = Math.floor(new Date().getTime() / 1000)
        const refreshTokenId = uuid()

        await session.edit({ refreshTokenId, moment: new Moment(date * 1000) })

        return jwt.sign({
            sub: session.userId.id,
            iat: date,
            exp: date + lifetime,
            jti: refreshTokenId,
            dvi: session.deviceId
        }, this._secret)
    }

    public async createRefreshToken(user: User, deviceId: string, lifetime: number = 2 * weekSeconds): Promise<string | Error> {
        const session: Session | Error = await Session.fromUserDevice(user, deviceId)

        if (session instanceof Error) {
            return session
        }

        return this.createRefreshTokenFromSession(session, lifetime)
    }

    public getAccessTokenPayload(token: string): AccessToken | Error {
        try {
            const payload: JwtPayload = (jwt.verify(token, this._secret) as JwtPayload)

            const sub: number = (() => {
                switch (typeof payload.sub) {
                    case "number":
                        return payload.sub

                    case "string":
                        return parseInt(payload.sub)

                    default:
                        throw new Error("Invalid sub")
                }
            })()

            return {
                sub: sub,
                iat: payload.iat || (() => { throw new Error("Invalid iat") })(),
                exp: payload.exp || (() => { throw new Error("Invalid exp") })(),
            }
        } catch (e) {
            const msg = "Failed to get payload: " + e
            return new Error(msg)
        }
    }

    public getRefreshTokenPayload(token: string): RefreshToken | Error {
        try {
            const payload: JwtPayload = (jwt.verify(token, this._secret) as JwtPayload)

            const sub: number = (() => {
                switch (typeof payload.sub) {
                    case "number":
                        return payload.sub

                    case "string":
                        return parseInt(payload.sub)

                    default:
                        throw new Error("Invalid sub")
                }
            })()

            return {
                sub: sub,
                iat: payload.iat || (() => { throw new Error("Invalid iat") })(),
                exp: payload.exp || (() => { throw new Error("Invalid exp") })(),
                jti: payload.jti || (() => { throw new Error("Invalid jti") })(),
                dvi: payload.dvi || (() => { throw new Error("Invalid dvi") })()
            }
        } catch (e) {
            const msg = "Failed to get payload: " + e
            return new Error(msg)
        }
    }

    public constructor() {
        this._secret = "test"//process.env.PRIVATE_KEY as string
    }
}

export default new Jwt()
export { AccessToken, RefreshToken }
