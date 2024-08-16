import bdClient from "@api/bdClient"
import { pgFormat } from "@helpers"
import { Email } from "@primitives"
import { QueryResult } from "pg"

export default async function deleteVerificationCode(email: Email): Promise<boolean | Error> {
    try {
        const response: QueryResult = await bdClient.query(`delete from verification_codes where email='${pgFormat(email)}'`)

        return response.rowCount != 0
    } catch (e) {
        const msg = "Error in deleteVerificationCode request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
