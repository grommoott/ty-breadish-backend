import bdClient from "@api/bdClient";
import getBakery from "@api/get/getBakery";
import { isEmpty, pgFormat } from "@helpers";
import { IBakery } from "@interfaces";
import { BakeryId } from "@primitives";
import { Coords } from "@primitives";

export default async function updateBakery(id: BakeryId, data: { address?: string, coords?: Coords }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const bakeryWithId: IBakery | Error = await getBakery(id)

        if (bakeryWithId instanceof Error) {
            return bakeryWithId
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            switch (key) {
                case "coords":
                    return (value as Coords).toBDView()

                default:
                    return `'${pgFormat(value)}'`
            }
        }

        const setString = Object.entries(data).filter(([_, val]) => val != undefined).map(([key, val]) => {
            return `${key}=${valueConverter(key, val)}`
        }).join(", ")

        await bdClient.query(`update bakeries set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateBakery request: " + e
        throw new Error(msg, { cause: 500 })
    }

}
