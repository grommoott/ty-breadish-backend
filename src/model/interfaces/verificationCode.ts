import { Moment } from "@primitives";

interface IVerificationCode {
    username: string,
    code: number,
    moment: Moment
}

function queryRowToVerificationCode(row: any): IVerificationCode {
    if (!(
        "username" in row &&
        "code" in row &&
        "moment" in row
    )) {
        throw new Error("Invalid query row to convert into IVerificationCode")
    }

    return {
        username: row.username,
        code: row.code,
        moment: new Moment(row.moment)
    }
}

export { IVerificationCode, queryRowToVerificationCode }
