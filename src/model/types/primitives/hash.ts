import bcrypt from "bcrypt"

class Hash {
    private _hash: string

    public get hash(): string {
        return this._hash
    }

    public static async hashPassword(password: string): Promise<Hash> {
        return new Hash(await bcrypt.hash(password, 10))
    }

    public async compare(password: string): Promise<boolean> {
        return bcrypt.compare(password, this._hash)
    }

    public constructor(value: string) {
        this._hash = value
    }
}

export { Hash }
