import { Email, Moment } from "@primitives";

interface IVerificationCode {
    email: Email,
    code: number,
    moment: Moment
}

function queryRowToVerificationCode(row: any): IVerificationCode {
    if (!(
        "email" in row &&
        "code" in row &&
        "moment" in row
    )) {
        throw new Error("Invalid query row to convert into IVerificationCode")
    }

    return {
        email: row.email,
        code: row.code,
        moment: new Moment(row.moment)
    }
}

export { IVerificationCode, queryRowToVerificationCode }
