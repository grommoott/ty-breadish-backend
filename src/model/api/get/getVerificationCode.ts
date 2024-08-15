import { IUser, IVerificationCode, queryRowToVerificationCode } from "@interfaces";
import { UserId } from "@primitives";
import getUser from "./getUser";
import { QueryResult } from "pg";
import bdClient from "@api/bdClient";
import getUserByUsername from "./getUserByUsername";
import { pgFormat } from "@helpers";

export default async function getVerificationCode(username: string): Promise<IVerificationCode | Error> {
    try {
        const response: QueryResult = await bdClient.query(`select * from verification_codes where "username"='${pgFormat(username)}'`)

        if (response.rowCount == 0) {
            return new Error(`There is no verification code for user ${username}`)
        }

        return queryRowToVerificationCode(response.rows[0])
    } catch (e) {
        const msg = "Error in getVerificationCode request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
