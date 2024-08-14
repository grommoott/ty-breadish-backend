import { pgFormat } from "@helpers"
import { IBDPrimitive } from "./bdPrimitive"

class Email implements IBDPrimitive {
    private _email: string

    public get email(): string {
        return this._email
    }

    public toString(): string {
        return this._email
    }

    public toBDView(): string {
        return `'${pgFormat(this._email)}'`
    }

    public serialize(): string {
        return this._email
    }

    public constructor(email: string) {
        let isValid: boolean = true
        const adressArr: Array<string> = email.split("@")
        const urlArr: Array<string> = adressArr[1]?.split(".")

        isValid = isValid && adressArr?.length == 2
        isValid = isValid && adressArr[0]?.length > 0
        isValid = isValid && adressArr[1]?.length > 0
        isValid = isValid && urlArr?.length == 2

        urlArr?.map((str) => {
            isValid = isValid && str.length > 0
        })

        if (!isValid) {
            throw new Error(`Invalid email(${email})`)
        }

        this._email = email
    }
}

export { Email }
