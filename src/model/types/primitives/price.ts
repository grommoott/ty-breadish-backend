import { IBDPrimitive } from "./bdPrimitive"

class Price implements IBDPrimitive {
    private _price: number

    public get price(): number {
        return this._price
    }

    public toString(): string {
        return `${this._price.toString()} ₽`
    }

    public toBDView(): string {
        return this._price.toString()
    }

    public serialize(): string {
        return this._price.toString()
    }

    public constructor(price: number) {
        this._price = price
    }
}

export { Price }
