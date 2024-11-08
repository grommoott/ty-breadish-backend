import { Entity } from "./entity";
import { BakeryId } from "@primitives";
import { Coords } from "@primitives";
import createBakery from "@api/post/createBakery";
import updateBakery from "@api/put/updateBakery";
import deleteBakery from "@api/delete/deleteBakery";
import getBakery from "@api/get/getBakery";
import getBakeries from "@api/get/getBakeries";
import { IBakery } from "@interfaces";

class Bakery extends Entity {

    // Private fields

    private _bakery: IBakery

    // Getters

    public get id(): BakeryId {
        return this._bakery.id
    }

    public get address(): string {
        return this._bakery.address
    }

    public get coords(): Coords {
        return this._bakery.coords
    }

    // Methods

    public async edit(data: { address?: string, coords?: Coords }): Promise<void | Error> {
        return await updateBakery(this.id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteBakery(this.id)
    }

    // Static constructors

    public static async fromId(id: BakeryId): Promise<Bakery | Error> {
        const response: IBakery | Error = await getBakery(id)

        if (response instanceof Error) {
            return response
        }

        return new Bakery(response)
    }

    public static async getList(): Promise<Array<Bakery> | Error> {
        const response: Array<IBakery> | Error = await getBakeries()

        if (response instanceof Error) {
            return response
        }

        return response.map(bakery => new Bakery(bakery))
    }

    public static async create(address: string, coords: Coords): Promise<Bakery | Error> {
        const response: IBakery | Error = await createBakery(address, coords)

        if (response instanceof Error) {
            return response
        }

        return new Bakery(response)
    }

    // Overrides

    public override toNormalView(): object {
        return {
            id: this.id.id,
            address: this.address,
            coords: this.coords.toNormalView()
        }
    }

    // Constructor

    private constructor({ id, address, coords }: IBakery) {
        super()

        this._bakery = { id, address, coords }
    }
}

export { Bakery }
