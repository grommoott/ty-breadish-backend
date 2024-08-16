import { IUser, IVerificationCode, queryRowToVerificationCode } from "@interfaces";
import { Email, UserId } from "@primitives";
import getUser from "./getUser";
import { QueryResult } from "pg";
import bdClient from "@api/bdClient";
import getUserByUsername from "./getUserByUsername";
import { pgFormat } from "@helpers";

export default async function getVerificationCode(email: Email): Promise<IVerificationCode | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from verification_codes where email='${pgFormat(email)}'`)

        if (response.rowCount == 0) {
            return new Error(`There is no verification code for user ${email}`)
        }

        return queryRowToVerificationCode(response.rows[0])
    } catch (e) {
        const msg = "Error in getVerificationCode request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
