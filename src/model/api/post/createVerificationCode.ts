import bdClient from "@api/bdClient";
import getUser from "@api/get/getUser";
import getUserByUsername from "@api/get/getUserByUsername";
import getVerificationCode from "@api/get/getVerificationCode";
import { pgFormat } from "@helpers";
import { IUser, IVerificationCode, queryRowToVerificationCode } from "@interfaces";
import { Moment, UserId } from "@primitives";
import { QueryResult } from "pg";

export default async function createVerificationCode(username: string, code: number, moment?: Moment) {
    try {
        const _moment: Moment = (() => {
            if (moment) {
                return moment
            } else {
                return Moment.now()
            }
        })()

        const verificationCode: IVerificationCode | Error = await getVerificationCode(username)

        if (!(verificationCode instanceof Error)) {
            return new Error(`There is already verification code for user ${username}`)
        }

        const response: QueryResult = await bdClient.query(`insert into verification_codes values ('${pgFormat(username)}', ${code}, ${_moment}) returning *`)

        return queryRowToVerificationCode(response.rows[0])
    } catch (e) {
        const msg = "Error in createVerificationCode request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
