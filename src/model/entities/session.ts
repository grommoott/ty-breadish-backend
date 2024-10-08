import { deleteSession } from "@api/delete/deleteSession"
import { getSession } from "@api/get/getSession"
import getSessionByUserDevice from "@api/get/getSessionByUserDevice"
import createSession from "@api/post/createSession"
import updateSession from "@api/put/updateSession"
import { ISession } from "@interfaces"
import { Moment, SessionId, UserId } from "@primitives"
import { User } from "./user"
import { v4 as uuid } from "uuid"

class Session {

    // Private fields

    private _session: ISession

    // Getters

    public get id(): SessionId {
        return this._session.id
    }

    public get userId(): UserId {
        return this._session.userId
    }

    public get refreshTokenId(): string {
        return this._session.refreshTokenId
    }

    public get deviceId(): string {
        return this._session.deviceId
    }

    public get moment(): Moment {
        return this._session.moment
    }

    // Methods

    public async edit(data: { refreshTokenId?: string, moment?: Moment }): Promise<void | Error> {
        return await updateSession(this._session.id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteSession(this._session.id)
    }

    // Static constructors

    public static async fromId(id: SessionId) {
        const session: ISession | Error = await getSession(id)

        if (session instanceof Error) {
            return session
        }

        return new Session(session)
    }

    public static async fromUserDevice(user: User, deviceId: string) {
        const session: ISession | Error = await getSessionByUserDevice(user.id, deviceId)

        if (session instanceof Error) {
            return session
        }

        return new Session(session)
    }

    public static async create(user: User, deviceId?: string): Promise<Session | Error> {
        const _deviceId: string = (() => {
            if (deviceId) {
                return deviceId
            } else {
                return uuid()
            }
        })()

        const session: ISession | Error = await createSession(user.id, _deviceId)

        if (session instanceof Error) {
            return session
        }

        return new Session(session)
    }

    private constructor({ id, userId, refreshTokenId, deviceId, moment }: ISession) {
        this._session = { id, userId, refreshTokenId, deviceId, moment }
    }
}

export { Session }
