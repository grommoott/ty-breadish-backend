import { Moment, SessionId, UserId } from "@primitives";

interface ISession {
    id: SessionId,
    userId: UserId,
    refreshTokenId: string,
    deviceId: string,
    moment: Moment
}

function queryRowToSession(row: any): ISession {
    if (!(
        "id" in row &&
        "user_id" in row &&
        "refresh_token_id" in row &&
        "device_id" in row &&
        "moment" in row
    )) {
        throw new Error("Invalid query row to convert into ISession")
    }

    return {
        id: new SessionId(row.id),
        userId: new UserId(row.user_id),
        refreshTokenId: row.refresh_token_id,
        deviceId: row.device_id,
        moment: new Moment(row.moment)
    }
}

export { ISession, queryRowToSession }
