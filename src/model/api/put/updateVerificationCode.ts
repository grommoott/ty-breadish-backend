import bdClient from "@api/bdClient";
import getVerificationCode from "@api/get/getVerificationCode";
import { isEmpty, pgFormat } from "@helpers";
import { IVerificationCode } from "@interfaces";
import { Moment, UserId } from "@primitives";

export default async function updateVerificationCode(username: string, data: { code?: number, moment?: Moment }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const verificationCode: IVerificationCode | Error = await getVerificationCode(username)

        if (verificationCode instanceof Error) {
            return verificationCode
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${key}=${val}`
        }).join(", ")

        await bdClient.query(`update verification_codes set ${setString} where "user"='${pgFormat(username)}'`)
    } catch (e) {
        const msg = "Error in updateVerificationCode request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
