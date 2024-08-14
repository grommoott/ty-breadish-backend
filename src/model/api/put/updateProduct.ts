import bdClient from "@api/bdClient";
import getProduct from "@api/get/getProduct";
import { isEmpty, pgFormat } from "@helpers";
import { IProduct } from "@interfaces";
import { ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateProduct(id: ProductId, data: { price?: Price, name?: string, description?: string, itemInfo?: ItemInfo }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const productWithId: IProduct | Error = await getProduct(id)

        if (productWithId instanceof Error) {
            return productWithId
        }

        const nameConverter: (name: string) => string = (name: string): string => {
            switch (name) {
                case "itemInfo":
                    return "item_info"

                default:
                    return name
            }
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            switch (key) {
                case "itemInfo":
                    return (value as ItemInfo).toBDView()

                case "price":
                    return (value as Price).toBDView()

                default:
                    return `'${pgFormat(value)}'`
            }
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`
        })

        bdClient.query(`update products set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateProduct request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
