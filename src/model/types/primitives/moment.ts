import { IBDPrimitive } from "./bdPrimitive"

class Moment implements IBDPrimitive {
    private _moment: number

    public get moment(): number {
        return this._moment
    }

    public static now(): Moment {
        return new Moment(new Date().getTime())
    }

    public toString(): string {
        return this._moment.toString()
    }

    public toBDView(): string {
        return this._moment.toString()
    }

    public constructor(moment: number) {
        this._moment = moment
    }
}

export { Moment }
