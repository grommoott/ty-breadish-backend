import deleteVerificationCode from "@api/delete/deleteVerificationCode";
import getVerificationCode from "@api/get/getVerificationCode";
import createVerificationCode from "@api/post/createVerificationCode";
import updateVerificationCode from "@api/put/updateVerificationCode";
import { hour } from "@helpers/timeConstants";
import { IVerificationCode } from "@interfaces";
import { Email, Moment } from "@primitives";

class VerificationCode {

    // Private fields

    private _verificationCode: IVerificationCode
    private static _maxAge: number = hour

    // Getters

    public get email(): Email {
        return this._verificationCode.email
    }

    public get code(): number {
        return this._verificationCode.code
    }

    public get moment(): Moment {
        return this._verificationCode.moment
    }

    public get isFresh(): boolean {
        return Moment.now().moment - this._verificationCode.moment.moment <= VerificationCode._maxAge
    }

    // Methods

    public async edit(data: { code?: number, moment?: Moment }): Promise<void | Error> {
        return await updateVerificationCode(this._verificationCode.email, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteVerificationCode(this._verificationCode.email)
    }

    public async compare(code: number): Promise<boolean | Error> {
        const result = code === this.code

        if (result) {
            const del: boolean | Error = await deleteVerificationCode(this.email)

            if (del instanceof Error) {
                return del
            }
        }

        return result
    }


    // Static constructors

    public static async fromEmail(email: Email): Promise<VerificationCode | Error> {
        const verificationCode: IVerificationCode | Error = await getVerificationCode(email)

        if (verificationCode instanceof Error) {
            return verificationCode
        }

        return new VerificationCode(verificationCode)
    }

    public static async create(email: Email): Promise<VerificationCode | Error> {
        const code = 100000 + Math.floor(900000 * Math.random())

        const verificationCode: IVerificationCode | Error = await createVerificationCode(email, code)

        if (verificationCode instanceof Error) {
            return verificationCode
        }

        return new VerificationCode(verificationCode)
    }

    private constructor({ email, code, moment }: IVerificationCode) {
        this._verificationCode = { email, code, moment }
    }
}

export { VerificationCode }
