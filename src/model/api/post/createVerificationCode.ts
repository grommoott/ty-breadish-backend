import bdClient from "@api/bdClient";
import getVerificationCode from "@api/get/getVerificationCode";
import { pgFormat } from "@helpers";
import { IVerificationCode, queryRowToVerificationCode } from "@interfaces";
import { Email, Moment } from "@primitives";
import { QueryResult } from "pg";

export default async function createVerificationCode(email: Email, code: number, moment?: Moment) {
    try {
        const _moment: Moment = (() => {
            if (moment) {
                return moment
            } else {
                return Moment.now()
            }
        })()

        const verificationCode: IVerificationCode | Error = await getVerificationCode(email)

        if (!(verificationCode instanceof Error)) {
            return new Error(`There is already verification code for email ${email}`)
        }

        const response: QueryResult = await bdClient.query(`insert into verification_codes values (default, '${pgFormat(email)}', ${code}, ${_moment}) on conflict (email) do update set code=${code}, moment=${_moment} returning *`)

        return queryRowToVerificationCode(response.rows[0])
    } catch (e) {
        const msg = "Error in createVerificationCode request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
