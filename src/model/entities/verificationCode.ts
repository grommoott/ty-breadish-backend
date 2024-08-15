import deleteVerificationCode from "@api/delete/deleteVerificationCode";
import getVerificationCode from "@api/get/getVerificationCode";
import createVerificationCode from "@api/post/createVerificationCode";
import updateVerificationCode from "@api/put/updateVerificationCode";
import { hour } from "@helpers/timeConstants";
import { IVerificationCode } from "@interfaces";
import { Moment } from "@primitives";

class VerificationCode {

    // Private fields

    private _verificationCode: IVerificationCode
    private static _maxAge: number = hour

    // Getters

    public get username(): string {
        return this._verificationCode.username
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
        return await updateVerificationCode(this._verificationCode.username, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteVerificationCode(this._verificationCode.username)
    }


    // Static constructors

    public static async fromUsername(username: string): Promise<VerificationCode | Error> {
        const verificationCode: IVerificationCode | Error = await getVerificationCode(username)

        if (verificationCode instanceof Error) {
            return verificationCode
        }

        return new VerificationCode(verificationCode)
    }

    public static async create(username: string): Promise<VerificationCode | Error> {
        const code = 100000 + Math.floor(900000 * Math.random())

        const verificationCode: IVerificationCode | Error = await createVerificationCode(username, code)

        if (verificationCode instanceof Error) {
            return verificationCode
        }

        return new VerificationCode(verificationCode)
    }

    private constructor({ username, code, moment }: IVerificationCode) {
        this._verificationCode = { username, code, moment }
    }
}

export { VerificationCode }
