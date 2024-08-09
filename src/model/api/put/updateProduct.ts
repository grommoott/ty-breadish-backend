import bdClient from "@api/bdClient";
import isEmpty from "helpers/isEmpty";
import { ItemInfo, Price, ProductId } from "@primitives";
import { QueryResult } from "pg";

export default async function updateProduct(id: ProductId, data: { price?: Price, name?: string, description?: string, itemInfo?: ItemInfo }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const productWithId: QueryResult = await bdClient.query(`select count(*) from products where id=${id}`)

        if (productWithId.rows[0].count == 0) {
            return new Error(`Product with id ${id} isn't exists`)
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
                    return `'${value}'`
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
