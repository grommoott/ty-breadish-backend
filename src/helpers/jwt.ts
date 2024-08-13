import { Moment, UserId } from "@primitives"
import jwt from "jsonwebtoken"
import { Session } from "@entities"
import { v4 as uuid } from "uuid"

type AccessToken = {
    sub: UserId,
    iat: Moment, // Unix Timestamp of token creation
    exp: Moment, // Unix Timestamp of token invalidation
}

type RefreshToken = {
    sub: UserId,
    iat: Moment,
    exp: Moment,
    jti: string, // Token id
    dvi: string, // Device id
}

const week = 7 * 24 * 3600

class Jwt {
    private _secret: string

    public createAccessToken(userId: UserId, lifetime: number = 1800): string {
        const date = Math.floor(new Date().getTime() / 1000)

        return jwt.sign({
            sub: userId.id,
            iat: date,
            exp: date + lifetime
        }, this._secret)
    }

    public async createRefreshTokenFromSession(session: Session, lifetime: number = 2 * week): Promise<string | Error> {
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

    public async createRefreshToken(userId: UserId, deviceId: string, lifetime: number = 2 * week): Promise<string | Error> {
        const session: Session | Error = await Session.fromUserDevice(userId, deviceId)

        if (session instanceof Error) {
            return session
        }

        return this.createRefreshTokenFromSession(session)
    }

    public async createSession(userId: UserId): Promise<Session | Error> {
        const refreshTokenId = uuid()
        const deviceId = uuid()

        const session: Session | Error = await Session.create(userId, refreshTokenId, deviceId)

        return session
    }

    public constructor() {
        this._secret = "test"//process.env.PRIVATE_KEY as string
    }
}

export default new Jwt()
