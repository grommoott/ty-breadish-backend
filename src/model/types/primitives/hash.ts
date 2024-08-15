import bcrypt from "bcrypt"
import { IBDPrimitive } from "./bdPrimitive"
import { pgFormat } from "@helpers"

class Hash implements IBDPrimitive {
    private _hash: string

    public get hash(): string {
        return this._hash
    }

    public static async hashPassword(password: string): Promise<Hash> {
        return new Hash(await bcrypt.hash(password, 10))
    }

    public async compare(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this._hash)
    }

    public toString(): string {
        return this._hash
    }

    public toBDView(): string {
        return `'${pgFormat(this._hash)}'`
    }

    public serialize(): string {
        return this._hash
    }

    public constructor(value: string) {
        this._hash = value
    }
}

export { Hash }
