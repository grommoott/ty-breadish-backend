import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { Item } from "./item";
import { IItem, IProduct, isItemIsProduct, isItemIsRecipe } from "@interfaces";
import updateProduct from "@api/put/updateProduct";
import deleteProduct from "@api/delete/deleteProduct";
import getProducts from "@api/get/getProducts";
import getProduct from "@api/get/getProduct";
import getItem from "@api/get/getItem";

class Product extends Item {

    // Private fields

    private _id: ProductId
    private _price: Price

    // Getters

    public get id(): ProductId {
        return this._id
    }

    public get price(): Price {
        return this._price
    }

    // Methods

    public async edit(data: { price: Price, name: string, description: string, itemInfo: ItemInfo }): Promise<void | Error> {
        return await updateProduct(this._id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteProduct(this._id)
    }

    // Static constructors

    public static async fromId(id: ProductId): Promise<Product | Error> {
        const product: IProduct | Error = await getProduct(id)

        if (product instanceof Error) {
            return product
        }

        return new Product(product)
    }

    public static override async fromItemId(id: ItemId): Promise<Product | Error> {
        const item: IItem | Error = await getItem(id)

        if (item instanceof Error) {
            return item
        }

        if (isItemIsRecipe(item)) {
            return new Error(`Item with this id(${id}) actually is a recipe, but not a product`)
        }

        return new Product(item as IProduct)
    }

    public static async getProducts(): Promise<Array<Product>> {
        const products: Array<IProduct> = await getProducts()

        return products.map(product => new Product(product))
    }

    private constructor({ id, price, itemId, name, description, avgRate, itemInfo }: IProduct) {
        super({ itemId, name, description, avgRate, itemInfo })

        this._id = id
        this._price = price
    }
}

export { Product }
