import { BakeryId, Coords } from "@primitives";

interface IBakery {
    id: BakeryId
    address: string
    coords: Coords
}

function queryRowToBakery(row: any): IBakery {
    if (!("id" in row && "address" in row && "coords" in row)) {
        throw new Error("Invalid query row to convert into IBakery")
    }

    return {
        id: new BakeryId(row.id),
        address: row.address,
        coords: Coords.fromObject(row.coords)
    }
}

export { IBakery, queryRowToBakery }
