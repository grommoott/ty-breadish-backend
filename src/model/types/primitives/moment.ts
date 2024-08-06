class Moment {
    private _moment: number

    public get moment(): number {
        return this._moment
    }

    public static now(): Moment {
        return new Moment(new Date().getTime())
    }

    public constructor(moment: number) {
        this._moment = moment
    }
}

export { Moment }
